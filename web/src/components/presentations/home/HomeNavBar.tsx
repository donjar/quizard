import React from 'react';

import NavBar from '../common/NavBar';
import { LogoutButton } from '../common/buttons/LogoutButton';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';

const HomeNavBar: React.FC = () => {
  return (
    <NavBar background={`var(--beige)`}>
      <Quizard />
      <LogoutButton />
    </NavBar>
  );
};

export default HomeNavBar;
