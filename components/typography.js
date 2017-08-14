import { createElement } from "react";
import PropTypes from "prop-types";
import { style, merge } from "glamor";
import typography from "../style/typography";
import color from "../style/colors";

const styles = {
  p: style({
    fontFamily: typography.sans,
    margin: "0 0 10px",
    lineHeight: 1.45,
    WebkitFontSmoothing: "antialiased",
    fontSize: 18
  }),
  ul: style({
    fontFamily: typography.sans,
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
    fontSize: 18,
    listStyle: "none",
    WebkitFontSmoothing: "antialiased"
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
    marginTop: 20,
    marginBottom: 10
  }),
  h1: style({
    fontSize: 34
  }),
  h2: style({
    fontSize: 24
  }),
  h3: style({
    fontSize: 20
  }),
  h4: style({
    fontSize: 18
  }),
  code: style({
    fontFamily: typography.mono,
    display: "inline-block",
    padding: "3px",
    fontSize: "80%",
    backgroundColor: color.offwhite,
    borderRadius: "3px",
    marginBottom: 0,
    wordBreak: "normal"
  }),
  codeBlock: style({
    display: "block"
  })
};

export const P = ({ children, className }) =>
  <p className={merge(styles.p, className)}>
    {children}
  </p>;

P.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object
};

export const Ul = ({ children, className }) =>
  <ul className={merge(styles.ul, className)}>
    {children}
  </ul>;

Ul.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object
};

export const Li = ({ children, className }) =>
  <li className={merge(styles.li, className)}>
    {children}
  </li>;

Li.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object
};

export const B = ({ children, className }) =>
  <b className={merge(styles.b, className)}>
    {children}
  </b>;

B.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object
};

export const Heading = ({ children, weight, className }) => {
  const weights = {
    "1": "h1",
    "2": "h2",
    "3": "h3",
    "4": "h4"
  };

  const element = weights[weight];

  return createElement(
    element,
    {
      className: merge(styles.heading, styles[element], className)
    },
    children
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object,
  weight: PropTypes.oneOf(["1", "2", "3", "4"]).isRequired
};

export const Code = ({ children, block = false, type, className }) =>
  <code className={merge(styles.code, block && styles.codeBlock, className)}>
    {children}
  </code>;

Code.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object,
  block: PropTypes.bool,
  type: PropTypes.oneOf(["js", "md", "sh"])
};

export default { P, Ul, Li, B, Heading, Code };
