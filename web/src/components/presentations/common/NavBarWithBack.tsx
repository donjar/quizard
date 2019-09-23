import React from 'react';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import NavBar from './NavBar';

export const NavBarWithBack: React.FC = () => {
  return (
    <NavBar background={'var(--beige)'}>
      <Link to="/home">
        <ChevronLeft />
      </Link>
      <Quizard />
      <div></div>
    </NavBar>
  );
};
