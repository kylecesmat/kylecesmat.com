import PropTypes from "prop-types";
import { style } from "glamor";
import { Heading } from "../typography";
import layout from "../../style/layout";

const styles = {
  post: style({
    padding: `0 ${layout.containerPadding} 32`,
    maxWidth: layout.containerWidth,
    width: "100%",
    margin: "0 auto"
  }),
  date: style({
    fontWeght: 200,
    fontSize: 12
  })
};

export const Post = ({ title, date, children }) =>
  <article className={styles.post}>
    <Heading weight="1">
      {title}
    </Heading>
    <date className={styles.date}>
      {date}
    </date>
    <section>
      {children}
    </section>
  </article>;

Post.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default Post;
