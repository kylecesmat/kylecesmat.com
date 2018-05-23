import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import layout from '../styles/layout';
import Link from './link';

const Footer = styled.footer`
  background-color: ${colors.darkGray};
`;

const Container = styled.div`
  padding: 15px;
  max-width: ${layout.containerWidth}px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  color: ${colors.darkGrayLight};
`;

const GithubLink = styled(Link)`
  color: ${colors.darkgraylight};
  & :hover {
    color: ${colors.linkColor};
  }
`;

export default () => (
  <Footer>
    <Container>
      <span>
        Made with{' '}
        <span aria-label="heart" role="img">
          ❤️
        </span>{' '}
        in Seattle -{' '}
        <GithubLink external href="https://github.com/kylecesmat/kylecesmat.com">
          view source
        </GithubLink>
      </span>
    </Container>
  </Footer>
);
