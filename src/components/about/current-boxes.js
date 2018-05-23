import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { loadIn } from '../../styles/animation';
import { interests } from '../data/interests.json';

const boxPadding = 10;

const Container = styled.section`
  margin: 30px auto;
`;

const Subtext = styled.div`
  opacity: 0;
  margin-ottom: 5px;
  color: ${colors.darkGray};
  font-weight: 500;
  font-size: 14px;
  animation: 350ms ease-in 900ms forwards ${loadIn};
`;

const TrackContainer = styled.div`
  min-height: 180px;
`;

const Track = styled.div`
  opacity: 0;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  overflow-x: scroll;
  webkit-overflow-scrolling: touch;
  animation: 350ms ease-in 1000ms forwards ${loadIn};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 0 0 ${({ leftPos }) => (leftPos ? leftPos - boxPadding : boxPadding)}px;
`;

const BoxContainer = styled.div`
  margin: ${boxPadding}px;
  background-color: ${colors.white};
  padding: ${boxPadding}px;
  border-radius: 4px;
  flex: 0 0 240px;
`;

const Box = styled.div`
  text-align: center;
  color: ${colors.darkGray};
`;

const BoxGlyph = styled.div`
  font-size: 28px;
  margin-bottom: 10px;
`;

const BoxHeading = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const BoxCopy = styled.p`
  font-size: 14px;
  font-weight: 200;
`;

export default class CurrentInterestsBoxes extends React.Component {
  state = {
    leftPos: 0
  };

  componentDidMount() {
    this.getCarouselLeftPos();
    if (window) {
      window.addEventListener('resize', this.getCarouselLeftPos);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.getCarouselLeftPos);
    }
  }

  getCarouselLeftPos = () => {
    const leftPos = this.container.getBoundingClientRect().left;
    this.setState({ leftPos });
  };

  render() {
    return (
      // eslint-disable-next-line no-return-assign
      <Container innerRef={(el) => (this.container = el)}>
        <Subtext>Things {`I'm`} excited about right now</Subtext>
        <TrackContainer>
          <Track>
            <Spacer leftPos={this.state.leftPos} />
            {interests.map((datum) => (
              <BoxContainer key={datum.glyph}>
                <Box>
                  <BoxGlyph>{datum.glyph}</BoxGlyph>
                  <BoxHeading>{datum.headline}</BoxHeading>
                  <BoxCopy>{datum.copy}</BoxCopy>
                </Box>
              </BoxContainer>
            ))}
            <Spacer />
          </Track>
        </TrackContainer>
      </Container>
    );
  }
}
