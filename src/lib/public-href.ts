const PUBLIC_HREF = /^(?:https:\/\/|mailto:)/i;

/**
 * An address an author typed into the content files, checked before it becomes
 * an href or a JSON-LD URL. http, protocol-relative, and javascript URLs fail
 * the build instead of being published.
 */
export function publicHref(url: string): string {
  if (PUBLIC_HREF.test(url) && !/[\u0000-\u0020\\]/.test(url)) return url;
  throw new Error(`Refusing a link that is not an https or mailto URL: ${url}`);
}

const SITE_PATH = /^\/(?!\/)/;

/**
 * A header or footer link. A path on this site is kept. Every other address
 * has to pass `publicHref`.
 */
export function navHref(url: string): string {
  if (SITE_PATH.test(url) && !/[\u0000-\u0020\\]/.test(url)) return url;
  return publicHref(url);
}
