import { Component } from "react";
import { style, merge } from "glamor";
import Link from "next/link";
import PropTypes from "prop-types";
import colors from "../style/colors";

export default class Anchor extends Component {
  static defaultProps = {
    custom: false,
    className: null,
    rel: null,
    activeClassName: null,
    pathname: null
  };

  static propTypes = {
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    activeClassName: PropTypes.string,
    custom: PropTypes.bool,
    pathname: PropTypes.string
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
      boxShadow: `1px solid ${colors.linkColor}`
    });

    return merge(
      link,
      !custom ? defaultLinkStyles : null,
      className,
      active ? activeClassName : null
    );
  }

  render() {
    const { href, rel, children } = this.props;

    return (
      <Link prefetch href={href}>
        <a rel={rel} className={this.getLinkStyle()}>
          {children}
        </a>
      </Link>
    );
  }
}
