import React from 'react';
import { Link } from 'react-router';
// import moment from 'moment';
import Markdown from './markdown';
import styles from './post-feed.css';

const ALL_POSTS = POSTS; // eslint-disable-line no-undef
const EXCERPT_LENGTH = 250;

const PostFeed = () => (
  <div>
    {ALL_POSTS.map((post) => (
      <Link to={`/${post.route}`}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>
            <Markdown markdown={post.markdown.substr(0, EXCERPT_LENGTH)} />
          </p>
        </div>
      </Link>
    ))}
  </div>
);

export default PostFeed;
