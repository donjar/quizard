import React from 'react';

import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import { LogoutButton } from '../common/buttons/LogoutButton';
import NavBar from '../common/NavBar';

const HomeNavBar: React.FC = () => {
  return (
    <NavBar background={`var(--beige)`}>
      <Quizard />
      <LogoutButton />
    </NavBar>
  );
};

export default HomeNavBar;
