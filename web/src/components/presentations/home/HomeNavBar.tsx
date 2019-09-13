import React from 'react';

import NavBar from '../common/NavBar';
import StyledLogo from '../common/StyledLogo';
import styled from 'styled-components';
import Button from '../common/buttons/DarkButton';

const HomeNavBar: React.FC = () => {
  return (
    <NavBar background={`var(--beige)`}>
      <StyledLogo />
      <Button> Logout </Button>
    </NavBar>
  );
};

export default HomeNavBar;
