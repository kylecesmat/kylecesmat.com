import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

describe('content security policy', () => {
  it('lets the page meta carry script hashes and the header carry framing', () => {
    const headers = readFileSync(new URL('../../public/_headers', import.meta.url), 'utf8');
    const config = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8');
    assert.equal(headers.includes("Content-Security-Policy: frame-ancestors 'none'"), true);
    assert.equal(headers.includes('script-src'), false);
    assert.equal(config.includes('security:'), true);
    assert.equal(config.includes('csp:'), true);
    assert.equal(config.includes("default-src 'self'"), true);
    assert.equal(config.includes('unsafe-inline'), true);
    assert.equal(config.includes("script-src 'unsafe-inline'"), false);
  });
});