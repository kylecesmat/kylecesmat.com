import path from "node:path";

/**
 * Directory index path for a built HTML file. `...html` would otherwise join
 * out of the artifact directory.
 */
export function indexDirectory(root, htmlFile) {
  const folder = path.resolve(root, htmlFile.slice(0, -".html".length));
  const base = path.resolve(root);
  if (folder !== base && !folder.startsWith(base + path.sep)) {
    throw new Error(`Refusing to write outside the Pages artifact: ${htmlFile}`);
  }
  return folder;
}
