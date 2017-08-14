import { Component } from "react";
import { style } from "glamor";
import PropTypes from "prop-types";
import layout from "../style/layout";
import { initGA, logPageView } from "../lib/analytics";

const wrapper = style({
  padding: layout.containerPadding,
  maxWidth: layout.containerWidth,
  width: "100%",
  margin: "0 auto"
});

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      <div className={wrapper}>
        {this.props.children}
      </div>
    );
  }
}
