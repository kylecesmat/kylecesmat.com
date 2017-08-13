import PropTypes from "prop-types";
import { style, merge } from "glamor";
import colors from "../style/colors";

const styles = {
  panel: style({
    backgroundColor: colors.white,
    padding: 20,
    marginTop: 10,
    borderRadius: 4,
    color: colors.darkGray
  })
};

export const Panel = ({ children, className }) =>
  <div className={merge(styles.panel, className)}>
    {children}
  </div>;

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object
};

export default Panel;
