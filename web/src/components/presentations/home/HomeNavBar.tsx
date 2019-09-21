import React from 'react';

import { IHomeNavBarProps } from '../../../interfaces/home';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import { LogoutButton } from '../common/buttons/LogoutButton';
import NavBar from '../common/NavBar';

const HomeNavBar: React.FC<IHomeNavBarProps> = ({
  onLogout
}) => {
  return (
    <NavBar background={`var(--beige)`}>
      <Quizard />
      <div onClick={onLogout}>
        <LogoutButton />
      </div>
    </NavBar>
  );
};

export default HomeNavBar;
