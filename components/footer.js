import { style } from "glamor";
import colors from "../style/colors";
import layout from "../style/layout";
import Link from "./link";

const footer = style({
  backgroundColor: colors.darkGray
});

const container = style({
  padding: 15,
  maxWidth: layout.containerWidth,
  width: "100%",
  margin: "0 auto",
  textAlign: "center",
  fontSize: 12,
  color: colors.darkGrayLight
});

const link = style({
  color: colors.darkGrayLight,
  ":hover": {
    color: colors.linkColor
  }
});

export default () =>
  <footer className={footer}>
    <div className={container}>
      <span>
        Made with{" "}
        <span aria-label="heart" role="img">
          ❤️
        </span>{" "}
        in Seattle -{" "}
        <Link
          custom
          className={link}
          href="https://github.com/kylecesmat/kylecesmat.com"
          external
        >
          view source
        </Link>
      </span>
    </div>
  </footer>;
