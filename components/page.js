import { style } from "glamor";
import PropTypes from "prop-types";
import layout from "../style/layout";

const wrapper = style({
  padding: 15,
  maxWidth: layout.containerWidth,
  width: "100%",
  margin: "0 auto"
});

const titleStyles = style({
  fontSize: 24
});

const Page = ({ children, title }) =>
  <div className={wrapper}>
    {title &&
      <h1 className={titleStyles}>
        {title}
      </h1>}
    {children}
  </div>;

Page.defaultProps = {
  title: null
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
