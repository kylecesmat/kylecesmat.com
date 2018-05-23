import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

export const Panel = styled.div`
  background-color: ${colors.white};
  padding: 15px 20px;
  margin-top: 10px;
  border-radius: 4px;
  color: ${colors.darkGray};

  & > * {
    margin-top: 0 !important;
  }
`;

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Panel;
