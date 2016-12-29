import React, { PropTypes } from 'react';
import { find } from 'lodash';
import Post from '../components/post';

import Page from '../components/page';

const ALL_POSTS = POSTS; // eslint-disable-line no-undef

const PostPage = ({ location }) => {
  let route = location.pathname;
  if (route.length > 1) {
    route = route.replace(/\//g, ''); // pathname sometimes includes a slash
  }
  const currentDoc = find(ALL_POSTS, { route });

  return (
    <Page title={currentDoc.title}>
      <Post post={currentDoc} />
    </Page>
  );
};

PostPage.propTypes = { location: PropTypes.object.isRequired };

export default PostPage;
