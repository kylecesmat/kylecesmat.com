// GitHub Pages serves a directory index and ignores folders whose names
// start with an underscore unless .nojekyll is present. Cloudflare Pages
// already rewrites /current to current.html, so this copy is only for the
// gh-pages branch.

import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { indexDirectory } from "./pages-path.mjs";

const source = "dist";
const destination = "dist-pages";

await cp(source, destination, { recursive: true });
await writeFile(path.join(destination, ".nojekyll"), "");
await writeFile(path.join(destination, "CNAME"), "kylecesmat.com\n");

async function addDirectoryIndexes(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await addDirectoryIndexes(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".html") || entry.name === "index.html" || entry.name === "404.html") {
      continue;
    }
    const folder = indexDirectory(directory, entry.name);
    await mkdir(folder, { recursive: true });
    await cp(fullPath, path.join(folder, "index.html"));
  }
}

await addDirectoryIndexes(destination);
console.log(`Wrote the GitHub Pages artifact to ${destination}`);
