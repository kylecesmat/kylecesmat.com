import React from 'react';
import styled from 'styled-components';
import Page from '../components/page';
import Link from '../components/link';
import { Panel } from '../components/panel';
import { media } from '../styles/media-queries';

const Heading = styled.h1`
  text-align: center;

  ${media.desktop`
    text-align: left;
  `};
`;

export default () => (
  <Page title="Contact">
    <Panel>
      <Heading>Contact</Heading>
      <p>
        {`I'm`} currently not accepting freelance work, however I am always
        interested in Coffee. Find me on{' '}
        <Link href="https://twitter.com/kylecesmat" external>
          Twitter
        </Link>{' '}
        talking about javascript & food, or connect with me on{' '}
        <Link href="https://www.linkedin.com/in/kylecesmat/" external>
          Linkedin
        </Link>. You can also find me sharing designs on{' '}
        <Link href="https://dribbble.com/kylecesmat" external>
          Dribbble
        </Link>, writing code at{' '}
        <Link href="https://github.com/kylecesmat" external>
          Github
        </Link>{' '}
        and open-sourcing my photos on{' '}
        <Link href="https://unsplash.com/@kylecesmat" external>
          Unsplash
        </Link>
      </p>
      <p>
        For additional coorespondance, my{' '}
        <span role="img" aria-label="inbox">
          📫
        </span>{' '}
        is open at{' '}
        <Link href="mailto:kyle@kylecesmat.com" external>
          kyle@kylecesmat.com
        </Link>
      </p>
    </Panel>
  </Page>
);
