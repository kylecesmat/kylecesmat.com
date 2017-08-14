import ReactGA from "react-ga";

const dev = process.env.NODE_ENV !== "production";

export const initGA = () => {
  ReactGA.initialize("UA-104533559-1", {
    debug: dev
  });
};

export const logPageView = () => {
  if (dev) {
    console.log(`Logging pageview for ${window.location.pathname}`);
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export default { initGA, logPageView, logEvent, logException };
