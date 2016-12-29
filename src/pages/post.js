import React, { PropTypes } from 'react';
import { find } from 'lodash';
import moment from 'moment';
import Markdown from '../components/markdown';

import Page from '../components/page';

const ALL_POSTS = POSTS; // eslint-disable-line no-undef

const Post = ({ location }) => {
  let route = location.pathname;
  if (route.length > 1) {
    route = route.replace(/\//g, ''); // pathname sometimes includes a slash
  }
  const currentDoc = find(ALL_POSTS, { route });

  return (
    <Page>
      <h1>{currentDoc.title}</h1>
      <date>{moment(currentDoc.date).format('MMMM Do YYYY')}</date>
      <Markdown markdown={currentDoc.markdown} />
    </Page>
  );
};

Post.propTypes = { location: PropTypes.object.isRequired };

export default Post;
