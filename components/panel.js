import classnames from "classnames";
import { style } from "glamor";
import colors from "../style/colors";

const styles = {
  panel: style({
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 4,
    color: colors.darkGray
  })
};

export const Panel = ({ children, className }) =>
  <div className={classnames(styles.panel, className)}>
    {children}
  </div>;

export default Panel;
