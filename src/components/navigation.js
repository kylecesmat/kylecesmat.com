import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from './link';
import colors from '../styles/colors';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkGray};
  color: ${colors.white};
`;

const NavList = styled.ul`
  padding: 15px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex: 0 1 420px;
  list-style: none;
`;
const NavListItem = styled.li``;
const NavLink = styled(Link)`
  color: ${({ active }) => (active ? colors.white : colors.darkGrayLight)};
  text-transform: uppercase;
  padding: 10px;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    color: ${colors.white};
  }
`;

export const Navigation = ({ pathname }) =>
  console.log(pathname) || (
    <Nav>
      <NavList>
        <NavListItem>
          <NavLink active={pathname === '/'} to="/">
            About
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink active={pathname === '/writing'} to="/writing">
            Writing
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink active={pathname === '/contact'} to="/contact">
            Contact
          </NavLink>
        </NavListItem>
      </NavList>
    </Nav>
  );

Navigation.proptypes = {
  pathname: PropTypes.string.isRequired
};

export default Navigation;
