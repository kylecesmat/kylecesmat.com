import { rehydrate } from "glamor";
import Intro from "../components/about/intro";
import CurrentBoxes from "../components/about/current-boxes";
import Page from "../components/page";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}

export default () => (
  <Page title="About">
    <Intro />
    <CurrentBoxes />
  </Page>
);
