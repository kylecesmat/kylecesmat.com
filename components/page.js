import { style } from "glamor";
import PropTypes from "prop-types";
import layout from "../style/layout";

const wrapper = style({
  padding: layout.containerPadding,
  maxWidth: layout.containerWidth,
  width: "100%",
  margin: "0 auto"
});

const Page = ({ children }) =>
  <div className={wrapper}>
    {children}
  </div>;

Page.defaultProps = {
  title: null
};

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
