import { createElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { style } from "glamor";
import typography from "../style/typography";
import color from "../style/colors";

const styles = {
  p: style({
    fontFamily: typography.sans,
    marginBottom: 16
  }),
  ul: style({
    fontFamily: typography.sans,
    margin: 0,
    padding: 0,
    listStyle: "none"
  }),
  li: style({
    marginBottom: 8
  }),
  b: style({
    fontWeight: 600
  }),
  heading: style({
    fontFamily: typography.sans,
    fontWeight: 600,
    marginTop: 0,
    marginBottom: 16
  }),
  h1: style({
    fontSize: 42
  }),
  h2: style({
    fontSize: 32
  }),
  h3: style({
    fontSize: 24
  }),
  h4: style({
    fontSize: 18
  }),
  code: style({
    backgroundColor: color.offwhite
  }),
  codeBlock: style({
    display: "block"
  })
};

export const P = ({ children }) =>
  <p className={styles.p}>
    {children}
  </p>;

P.propTypes = {
  children: PropTypes.node.isRequired
};

export const Ul = ({ children }) =>
  <ul className={styles.ul}>
    {children}
  </ul>;

Ul.propTypes = {
  children: PropTypes.node.isRequired
};

export const Li = ({ children }) =>
  <li className={styles.li}>
    {children}
  </li>;

Li.propTypes = {
  children: PropTypes.node.isRequired
};

export const B = ({ children }) =>
  <b className={styles.b}>
    {children}
  </b>;

B.propTypes = {
  children: PropTypes.node.isRequired
};

export const Heading = ({ children, weight }) => {
  const weights = {
    "1": "h1",
    "2": "h2",
    "3": "h3",
    "4": "h4"
  };

  return createElement(
    weights[weight],
    {
      className: classNames(styles.heading, styles[weight])
    },
    children
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  weight: PropTypes.oneOf(["1", "2", "3", "4"]).isRequired
};

export const Code = ({ children, block = false, type }) =>
  <code className={classNames(styles.code, block && styles.codeBlock)}>
    {children}
  </code>;

Code.propTypes = {
  children: PropTypes.node.isRequired,
  block: PropTypes.bool,
  type: PropTypes.oneOf(["js", "md", "sh"])
};

export default { P, Ul, Li, B, Heading, Code };
