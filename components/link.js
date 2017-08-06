import { Component } from "react";
import Router from "next/router";
import { style, merge } from "glamor";
import classnames from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";
import colors from "../style/colors";

export default class Anchor extends Component {
  static defaultProps = {
    custom: false
  };

  static getInitialProps({ pathname, req }) {
    console.log(pathname, req);
    return { pathname: (req && req.url) || pathname };
  }

  getLinkStyle() {
    const { href, className, activeClassName, custom } = this.props;
    let pathname = undefined;

    if (
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    ) {
      pathname = Router.pathname;
    }

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
