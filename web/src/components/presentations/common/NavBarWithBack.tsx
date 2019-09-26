import React from 'react';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import NavBar from './NavBar';
import Button from './buttons/Button';

export const NavBarWithBack: React.FC = () => {
  return (
    <NavBar background={'var(--beige)'}>
      <Link to="/home">
        <Button><ChevronLeft /></Button>
      </Link>
      <Quizard />
      <div></div>
    </NavBar>
  );
};
