import React from 'react';

import NavBar from '../common/NavBar';
import StyledLogo from '../common/StyledLogo';
import DarkButton from '../common/buttons/DarkButton';
import { Link } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  return (
    <>
      <Link to="/login">
        <DarkButton> Logout </DarkButton>
      </Link>
    </>
  );
};

const HomeNavBar: React.FC = () => {
  return (
    <NavBar background={`var(--beige)`}>
      <StyledLogo />
      <LogoutButton />
    </NavBar>
  );
};

export default HomeNavBar;
