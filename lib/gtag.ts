export const GA_TRACKING_ID = 'UA-104533559-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (process.env.NODE_ENV !== 'development') {
    // @ts-ignore
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
