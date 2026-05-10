const FALLBACK_FRONTEND_URL = 'https://demo.sling.biz';
const LOCALHOST_URL_REGEX = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i;
/** Issued before wildcard DNS; correct shape is https://<slug>.preview.sling.biz */
const LEGACY_PREVIEW_SLING_URL =
  /^https?:\/\/preview\.([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.(sling\.biz)(\/.*)?$/i;

export const addProtocolIfMissing = (url) => {
  if (!url) return '';
  return /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;
};

export const rewriteLegacySlingPreviewClientUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  const m = url.trim().match(LEGACY_PREVIEW_SLING_URL);
  if (!m) return url;
  const slug = m[1].toLowerCase();
  const path = m[3] || '';
  return `https://${slug}.preview.sling.biz${path}`;
};

/**
 * Base storefront URL for Studio (header link, preview iframe, etc.).
 * Rewrites legacy preview.<slug>.sling.biz and replaces localhost when Studio is not local.
 */
export const getStudioShopfrontBaseUrl = (clientUrl) => {
  const studioHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const isStudioRunningLocally =
    studioHost === 'localhost' || studioHost === '127.0.0.1';
  const normalizedClientUrl = addProtocolIfMissing(clientUrl?.trim());
  const resolved = rewriteLegacySlingPreviewClientUrl(normalizedClientUrl);
  if (
    !resolved ||
    (LOCALHOST_URL_REGEX.test(resolved) && !isStudioRunningLocally)
  ) {
    return FALLBACK_FRONTEND_URL;
  }
  return resolved;
};
