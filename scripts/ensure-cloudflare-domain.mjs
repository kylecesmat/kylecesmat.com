// Attach kylecesmat.com to the Pages project and keep www → apex.
// Idempotent. Refuses to delete any DNS record that is not a GitHub Pages address.
// Never prints the API token.

import { appendFileSync } from "node:fs";
import { Resolver } from "node:dns/promises";

const API = "https://api.cloudflare.com/client/v4";
const APEX = "kylecesmat.com";
const WWW = "www.kylecesmat.com";
const PROJECT = "kylecesmat";
const WWW_REDIRECT_REF = "www-to-apex";

const GITHUB_PAGES_A = new Set([
  "185.199.108.153",
  "185.199.109.153",
  "185.199.110.153",
  "185.199.111.153",
]);

const GITHUB_PAGES_AAAA = new Set([
  "2606:50c0:8000::153",
  "2606:50c0:8001::153",
  "2606:50c0:8002::153",
  "2606:50c0:8003::153",
]);

const token = process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

function setOutput(key, value) {
  const file = process.env.GITHUB_OUTPUT;
  if (!file) return;
  appendFileSync(file, `${key}=${value}\n`);
}

if (!token || !accountId) {
  console.error("CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required.");
  process.exit(1);
}

function errorText(json) {
  return (json?.errors ?? [])
    .map((error) => `${error.code ?? ""}: ${error.message ?? ""}`.trim())
    .join("; ");
}

async function cf(path, { method = "GET", body } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${method} ${path} returned non-JSON (${response.status})`);
  }

  return { status: response.status, ok: response.ok && json.success !== false, json };
}

async function cfOk(path, options) {
  const result = await cf(path, options);
  if (!result.ok) {
    throw new Error(
      `${options?.method ?? "GET"} ${path} failed (${result.status}): ${errorText(result.json) || "unknown error"}`,
    );
  }
  return result.json.result;
}

function isGithubPagesAddress(record) {
  if (record.type === "A") return GITHUB_PAGES_A.has(record.content);
  if (record.type === "AAAA") return GITHUB_PAGES_AAAA.has(record.content.toLowerCase());
  return false;
}

async function listDomains() {
  const result = await cfOk(`/accounts/${accountId}/pages/projects/${PROJECT}/domains`);
  return Array.isArray(result) ? result : [];
}

async function listAll(path) {
  const records = [];
  for (let page = 1; page <= 20; page += 1) {
    const separator = path.includes("?") ? "&" : "?";
    const batch = await cfOk(`${path}${separator}page=${page}&per_page=100`);
    if (!Array.isArray(batch)) break;
    records.push(...batch);
    if (batch.length < 100) break;
  }
  return records;
}

async function ensureProductionBranch() {
  const project = await cfOk(`/accounts/${accountId}/pages/projects/${PROJECT}`);
  console.log(
    `Pages project ${project.name}: production branch ${project.production_branch}, subdomain ${project.subdomain}`,
  );
  if (project.production_branch !== "master") {
    await cfOk(`/accounts/${accountId}/pages/projects/${PROJECT}`, {
      method: "PATCH",
      body: { production_branch: "master" },
    });
    console.log("Set production branch to master.");
  }
  return project;
}

async function zoneForApex() {
  const listed = await cf(`/zones?name=${APEX}`);
  if (!listed.ok) {
    console.log(`Zone lookup failed (${listed.status}): ${errorText(listed.json)}`);
    return null;
  }
  const zones = listed.json.result ?? [];
  const zone = zones.find((item) => item.name === APEX);
  if (!zone) {
    console.log(
      `Token cannot see the ${APEX} zone (${zones.length} name matches). DNS edits will be skipped.`,
    );
    return null;
  }
  return zone;
}

async function deleteGithubPagesApexRecords(zoneId) {
  const records = await listAll(`/zones/${zoneId}/dns_records?name=${APEX}`);
  const addresses = records.filter((record) => record.type === "A" || record.type === "AAAA");
  if (addresses.length === 0) {
    console.log("Apex has no A or AAAA records.");
    return;
  }
  const unexpected = addresses.filter((record) => !isGithubPagesAddress(record));
  if (unexpected.length > 0) {
    const described = unexpected
      .map((record) => `${record.type} ${record.content}`)
      .join(", ");
    throw new Error(`Refusing to delete non-GitHub-Pages apex records: ${described}`);
  }
  for (const record of addresses) {
    console.log(`Deleting ${record.type} ${record.name} → ${record.content}`);
    await cfOk(`/zones/${zoneId}/dns_records/${record.id}`, { method: "DELETE" });
  }
}

async function ensureApexCname(zoneId, target) {
  const records = await listAll(`/zones/${zoneId}/dns_records?name=${APEX}`);
  const cname = records.find((record) => record.type === "CNAME");
  if (cname?.content === target && cname.proxied) {
    console.log(`Apex CNAME already points at ${target} and is proxied.`);
    return;
  }
  if (cname) {
    console.log(`Updating apex CNAME ${cname.content} → ${target}`);
    await cfOk(`/zones/${zoneId}/dns_records/${cname.id}`, {
      method: "PATCH",
      body: { type: "CNAME", name: APEX, content: target, proxied: true },
    });
    return;
  }
  console.log(`Creating proxied apex CNAME → ${target}`);
  await cfOk(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: { type: "CNAME", name: APEX, content: target, proxied: true, ttl: 1 },
  });
}

async function ensureDomain(name) {
  const domains = await listDomains();
  const existing = domains.find((domain) => domain.name === name);
  if (existing) {
    console.log(`Pages domain ${name} is ${existing.status}.`);
    return existing;
  }
  console.log(`Adding Pages domain ${name}.`);
  return cfOk(`/accounts/${accountId}/pages/projects/${PROJECT}/domains`, {
    method: "POST",
    body: { name },
  });
}

async function waitUntilActive(name) {
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const domains = await listDomains();
    const domain = domains.find((item) => item.name === name);
    const status = domain?.status ?? "missing";
    console.log(`Domain ${name} status: ${status} (check ${attempt}/8)`);
    if (status === "active") return domain;
    if (status === "error" || status === "blocked" || status === "deactivated") {
      const detail = domain?.verification_data?.error_message || domain?.validation_data?.error_message;
      throw new Error(`Domain ${name} is ${status}${detail ? `: ${detail}` : ""}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
  console.log(`Domain ${name} is not active yet. Certificate issuance can finish after DNS is in place.`);
}

function wwwRedirectRule() {
  return {
    ref: WWW_REDIRECT_REF,
    enabled: true,
    description: "Redirect www.kylecesmat.com to the apex",
    expression: `(http.host eq "${WWW}")`,
    action: "redirect",
    action_parameters: {
      from_value: {
        status_code: 301,
        preserve_query_string: true,
        target_url: {
          expression: `concat("https://${APEX}", http.request.uri.path)`,
        },
      },
    },
  };
}

async function ensureWwwRedirect(zoneId) {
  const phase = "http_request_dynamic_redirect";
  const entry = await cf(`/zones/${zoneId}/rulesets/phases/${phase}/entrypoint`);
  const rule = wwwRedirectRule();

  if (!entry.ok) {
    const message = errorText(entry.json);
    const missing = entry.status === 404 || message.includes("could not find entrypoint");
    if (!missing) {
      console.log(`Could not read redirect rules (${entry.status}): ${message}`);
      return false;
    }
    const created = await cf(`/zones/${zoneId}/rulesets`, {
      method: "POST",
      body: {
        name: "Redirect rules ruleset",
        kind: "zone",
        phase,
        rules: [rule],
      },
    });
    if (!created.ok) {
      console.log(`Could not create the www redirect (${created.status}): ${errorText(created.json)}`);
      return false;
    }
    console.log("Created the www → apex redirect rule.");
    return true;
  }

  const ruleset = entry.json.result;
  const rules = ruleset.rules ?? [];
  const withoutOurs = rules.filter(
    (existing) => existing.ref !== WWW_REDIRECT_REF && existing.expression !== rule.expression,
  );
  const updated = await cf(`/zones/${zoneId}/rulesets/${ruleset.id}`, {
    method: "PUT",
    body: {
      name: ruleset.name || "Redirect rules ruleset",
      kind: "zone",
      phase,
      rules: [...withoutOurs, rule],
    },
  });
  if (!updated.ok) {
    console.log(`Could not update the www redirect (${updated.status}): ${errorText(updated.json)}`);
    return false;
  }
  console.log("www → apex redirect rule is in place.");
  return true;
}

async function pointWwwAtPages(zoneId, target) {
  const records = await listAll(`/zones/${zoneId}/dns_records?name=${WWW}`);
  const cname = records.find((record) => record.type === "CNAME");
  if (!cname) {
    console.log(`Creating proxied www CNAME → ${target}`);
    await cfOk(`/zones/${zoneId}/dns_records`, {
      method: "POST",
      body: { type: "CNAME", name: WWW, content: target, proxied: true, ttl: 1 },
    });
    return;
  }
  const githubTarget = cname.content === "kylecesmat.github.io";
  if (!githubTarget && cname.content !== target) {
    throw new Error(`Refusing to replace www CNAME ${cname.content}`);
  }
  if (cname.content === target && cname.proxied) {
    console.log(`www CNAME already points at ${target} and is proxied.`);
    return;
  }
  console.log(`Updating www CNAME ${cname.content} → ${target} (proxied)`);
  await cfOk(`/zones/${zoneId}/dns_records/${cname.id}`, {
    method: "PATCH",
    body: { type: "CNAME", name: WWW, content: target, proxied: true },
  });
}

async function authoritativeApexAddresses() {
  const bootstrap = new Resolver();
  const nameservers = await bootstrap.resolve4("lisa.ns.cloudflare.com");
  const resolver = new Resolver();
  resolver.setServers(nameservers);
  return resolver.resolve4(APEX);
}

async function assertApexLeftGithubPages() {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const addresses = await authoritativeApexAddresses();
    const stillGithub = addresses.every((address) => GITHUB_PAGES_A.has(address));
    console.log(`Authoritative ${APEX} A: ${addresses.join(", ")}`);
    if (!stillGithub) return;
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  throw new Error(`${APEX} still resolves to GitHub Pages at the Cloudflare nameservers.`);
}

async function zoneFromPagesDomain(domain) {
  const zoneId = domain?.zone_tag;
  if (!zoneId) {
    console.log("Pages domain response did not include a zone id.");
    return null;
  }
  const probe = await cf(`/zones/${zoneId}/dns_records?name=${APEX}&per_page=20`);
  if (!probe.ok) {
    console.log(`DNS read via the Pages zone id failed (${probe.status}): ${errorText(probe.json)}`);
    return null;
  }
  console.log("DNS is readable through the Pages domain zone id.");
  return { id: zoneId, name: APEX };
}

async function main() {
  const project = await ensureProductionBranch();
  const target = project.subdomain || `${PROJECT}.pages.dev`;

  let domain;
  try {
    domain = await ensureDomain(APEX);
  } catch (error) {
    console.log(`Adding ${APEX} failed: ${error.message}`);
    domain = null;
  }

  let zone = await zoneForApex();
  zone ??= await zoneFromPagesDomain(domain);
  if (!zone && !domain) {
    throw new Error(`Could not attach ${APEX} or read its DNS zone.`);
  }
  if (!zone) {
    console.log(
      "The API token can deploy Pages but cannot edit DNS. kylecesmat.com stays on GitHub Pages.",
    );
    setOutput("dns", "github-pages");
    return;
  }

  console.log(`Zone ${zone.name} ${zone.id}`);
  try {
    await ensureApexCname(zone.id, target);
  } catch (error) {
    console.log(`Apex CNAME failed: ${error.message}`);
    console.log("Removing the GitHub Pages apex addresses, then retrying.");
    await deleteGithubPagesApexRecords(zone.id);
    await ensureApexCname(zone.id, target);
  }

  await waitUntilActive(APEX);

  const redirected = await ensureWwwRedirect(zone.id);
  if (redirected) {
    await pointWwwAtPages(zone.id, target);
    try {
      await ensureDomain(WWW);
    } catch (error) {
      console.log(
        `www Pages domain was not attached (${error.message}). The redirect rule still sends www to the apex.`,
      );
    }
  } else {
    console.log("Left the existing www DNS record alone because the redirect rule was not saved.");
  }

  await assertApexLeftGithubPages();
  setOutput("dns", "cloudflare");
  console.log("Custom domain setup finished.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
