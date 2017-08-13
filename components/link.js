import { Component } from "react";
import { style, merge } from "glamor";
import Link from "next/link";
import PropTypes from "prop-types";
import colors from "../style/colors";

export default class Anchor extends Component {
  static defaultProps = {
    custom: false,
    className: null,
    rel: "noopener",
    activeClassName: null,
    pathname: null,
    external: false
  };

  static propTypes = {
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    className: PropTypes.object,
    children: PropTypes.node.isRequired,
    activeClassName: PropTypes.object,
    custom: PropTypes.bool,
    pathname: PropTypes.string,
    external: PropTypes.bool
  };

  static contextTypes = {
    pathname: PropTypes.string
  };

  getLinkStyle() {
    // @TODO passing pathname as a prop sucks.
    // https://github.com/zeit/next.js/pull/2352
    const { href, className, activeClassName, custom, pathname } = this.props;

    const active = pathname === href;

    const link = style({
      textDecoration: "none",
      cursor: "pointer"
    });

    const defaultLinkStyles = style({
      color: "inherit",
      transition: "background 0.4s ease-out",
      borderBottom: `1px solid ${colors.linkColor}`,
      boxShadow: `inset 0 -5px 0px 0px ${colors.linkColor}`,
      ":hover": {
        backgroundColor: `${colors.linkColor}`
      }
    });

    return merge(
      link,
      !custom ? defaultLinkStyles : null,
      className,
      active ? activeClassName : null
    );
  }

  render() {
    const { href, rel, children, external } = this.props;

    return (
      <Link prefetch={!external} href={href} passHref>
        <a
          rel={rel}
          className={this.getLinkStyle()}
          target={external ? "_blank" : "_self"}
        >
          {children}
        </a>
      </Link>
    );
  }
}
