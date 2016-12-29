import React, { PropTypes } from 'react';
import { find } from 'lodash';
import Markdown from '../components/markdown';

const ALL_POSTS = POSTS; // eslint-disable-line no-undef

const Page = ({ location }) => {
  let route = location.pathname;
  if (route.length > 1) {
    route = route.replace(/\//g, ''); // pathname sometimes includes a slash
  }
  const currentDoc = find(ALL_POSTS, { route });

  return (
    <main>
      <Markdown markdown={currentDoc.markdown} />
    </main>
  );
};

Page.propTypes = { location: PropTypes.object.isRequired };

export default Page;
