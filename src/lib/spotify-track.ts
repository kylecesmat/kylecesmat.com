/**
 * A Spotify track page, and nothing else. The listening row turns this string
 * into an href, so a value that is not a track URL is dropped rather than linked.
 */
const TRACK_URL =
  /^https:\/\/open\.spotify\.com\/(?:intl-[a-zA-Z-]+\/)?track\/[A-Za-z0-9]+(?:\?[A-Za-z0-9_=&%.-]*)?$/;

export function isSpotifyTrackUrl(value: string): boolean {
  return TRACK_URL.test(value);
}
