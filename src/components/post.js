import React, { PropTypes } from 'react';
import moment from 'moment';
import Markdown from './markdown';
import styles from './post.css';

const Post = ({ post }) => (
  <div className={styles.postWrapper}>
    <date className={styles.date}>{moment(post.date).format('MMMM Do YYYY')}</date>
    <Markdown markdown={post.markdown} />
  </div>
);

Post.propTypes = { post: PropTypes.object.isRequired };

export default Post;
