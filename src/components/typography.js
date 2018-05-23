import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import typography from '../styles/typography';
import color from '../styles/colors';

export const P = styled.p`
  font-family: ${typography.sans};
  margin: 0 0 10px;
  lineheight: 1.45;
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
`;

export const Ul = styled.ul`
  fontfamily: ${typography.sans};
  margin: 0;
  padding: 0;
  line-height: 1.4;
  font-size: 18px;
  list-style: none;
  -webkit-font-smoothing: antialiased;
`;

export const Li = styled.li`
  margin-bottom: 8px;
`;

export const B = styled.strong`
  font-weight: 600;
`;

export const Code = styled.code`
  font-amily: ${typography.mono};
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  padding: 3px;
  font-size: 80%;
  background-color: ${color.offwhite};
  border-radius: 3px;
  margin-bottom: 0;
  word-break: normal;
`;

Code.propTypes = {
  block: PropTypes.bool
};

const headingBase = css`
  font-family: ${typography.sans};
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const H1 = styled.h1`
  ${headingBase};
  font-size: 34px;
`;
export const H2 = styled.h2`
  ${headingBase};
  font-size: 24px;
`;
export const H3 = styled.h3`
  ${headingBase};
  font-size: 20px;
`;
export const H4 = styled.h4`
  ${headingBase};
  font-size: 18px;
`;

export const Heading = ({ weight }) =>
  ({
    '1': H1,
    '2': H2,
    '3': H3,
    '4': H4
  }[weight]);

Heading.propTypes = {
  weight: PropTypes.oneOf(['1', '2', '3', '4']).isRequired
};

export default { P, Ul, Li, B, Heading, Code };
