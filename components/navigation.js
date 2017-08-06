import { style } from "glamor";
import PropTypes from "prop-types";
import Link from "./link";
import colors from "../style/colors";

const styles = {
  nav: style({
    display: "flex",
    alignIems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkGray,
    color: colors.white
  }),
  ul: style({
    padding: 15,
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    flex: `0 1 420px`
  }),
  li: style({
    listStyle: "none"
  }),
  link: style({
    color: colors.darkGrayLight,
    textTransform: "uppercase",
    padding: 10,
    fontSize: 14,
    fontWeight: 700,
    ":hover": {
      color: colors.white
    }
  }),
  activeLink: style({
    color: colors.white
  })
};

export const Navigation = ({ pathname }) =>
  <nav className={styles.nav}>
    <ul className={styles.ul}>
      <li className={styles.li}>
        <Link
          custom
          pathname={pathname}
          activeClassName={styles.activeLink}
          href="/"
          className={styles.link}
        >
          About
        </Link>
      </li>
      <li className={styles.li}>
        <Link
          custom
          pathname={pathname}
          activeClassName={styles.activeLink}
          className={styles.link}
          href="/writing"
        >
          Writing
        </Link>
      </li>
      <li className={styles.li}>
        <Link
          custom
          pathname={pathname}
          activeClassName={styles.activeLink}
          className={styles.link}
          href="/contact"
        >
          Contact
        </Link>
      </li>
    </ul>
  </nav>;

Navigation.proptypes = {
  pathname: PropTypes.string.isRequired
};

export default Navigation;
