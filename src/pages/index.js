import React from 'react';
import Page from '../components/page';
import Intro from '../components/about/intro';
import CurrentBoxes from '../components/about/current-boxes';

const IndexPage = () => (
  <Page title="About">
    <Intro />
    <CurrentBoxes />
  </Page>
);

export default IndexPage;
