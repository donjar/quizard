import React from 'react';

import NavBar from '../common/NavBar';
import StyledLogo from '../common/StyledLogo';
import { LogoutButton } from '../common/buttons/LogoutButton';

const HomeNavBar: React.FC = () => {
  return (
    <NavBar background={`var(--beige)`}>
      <StyledLogo />
      <LogoutButton />
    </NavBar>
  );
};

export default HomeNavBar;
