import 'reset.css';
import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Navigation } from '../components/navigation';
import Footer from '../components/footer';

import '../styles/global.css';

const Wrapper = styled.main`
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background: #eef0f3;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & > nav {
    flex: 0 0 auto;
  }

  & > nav + div {
    flex: 1 1 100%;
  }

  & > footer {
    flex: 0 0 auto;
  }
`;

const Layout = ({ data, children, location }) => (
  <Wrapper>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content:
            'I am a designer & UI developer based in Seattle, WA. View my personal site and // read ramblings on life & software development.'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@kylecesmat' },
        {
          name: 'twitter:description',
          content:
            'I am a designer & UI developer based in Seattle, WA. View my personal site and // read ramblings on life & software development.'
        }
      ]}
    />
    <Navigation pathname={location.pathname} />
    {children()}
    <Footer />
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
