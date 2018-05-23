import React from 'react';
import styled from 'styled-components';
import { loadIn } from '../../styles/animation';
import { Panel } from '../panel';
import profileImg from '../../../static/me.jpg';

const imageSize = 100;

const Container = styled.div`
  opacity: 0;
  margin: 0 auto;
  width: 100%;
  animation: 350ms ease-in 50ms forwards ${loadIn};
`;

const MainPanel = styled(Panel)`
  padding: ${imageSize / 2 + 10}px 20px 20px;
  margin-top: ${imageSize / 2}px;
  text-align: center;

  & h1 {
    margin: 0 0 15px;
    font-size: 42px;
    font-weight: 600;
  }

  & p {
    font-weight: 200;
    line-hight: 1.4;
  }
`;

const Me = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  position: absolute;
  top: ${-(imageSize / 2) + 10}px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 200px;
`;

export default () => (
  <Container>
    <Me src={profileImg} alt="kyle cesmat" />
    <MainPanel>
      <h1>Kyle Cesmat</h1>
      <p>
        I am a software person who works with teams large & small to solve technical problems on the
        web. At Formidable I focus primarily on front-end expierences, optimizing application
        performance, building sustainable components & patterns for teams, and trying not to break
        too many things along the way!
      </p>
      <p>
        Away from the screen I like to travel, try my hand at cooking new foods, and find a great
        trail to hike with my pup Levi.
      </p>
    </MainPanel>
  </Container>
);
