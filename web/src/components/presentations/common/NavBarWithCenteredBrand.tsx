import React from 'react';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import NavBar from './NavBar';
import styled from 'styled-components';

const StyledBrand = styled(Quizard)`
  margin-left: auto;
  margin-right: auto;
`;

export const NavBarWithCenteredBrand: React.FC = () => {
  return (
    <NavBar background={'var(--beige)'}>
      <StyledBrand />
    </NavBar>
  );
};
