import React from 'react';
import styled from 'styled-components';
import { INavbarProps } from '../../../interfaces/common';

const StyledNavBar = styled.nav`
  position: ${({ fixed }: INavbarProps) => (fixed ? `fixed` : `absolute`)};
  width: 100%;
  height: 80px;
  left: 0px;
  top: 0px;
  background: ${(props: INavbarProps) => (props ? props.background : ``)};
  align-items: center;
`;

const StyledNavBody = styled.div`
  display: flex;
  height: 100%;
  padding: 0 2%;
  justify-content: space-between;
  align-items: center;
`;

const NavBar: React.FC<INavbarProps> = ({ background, fixed, children }) => {
  return (
    <StyledNavBar background={background} fixed={fixed}>
      <StyledNavBody>{children}</StyledNavBody>
    </StyledNavBar>
  );
};

export default NavBar;
