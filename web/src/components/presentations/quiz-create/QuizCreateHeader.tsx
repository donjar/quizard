import React from 'react';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import GreenButton from '../common/buttons/GreenButton';
import NavBar from '../common/NavBar';

export const QuizCreateHeader: React.FC = () => {
  return (
    <NavBar background={'var(--beige)'}>
      <Link to="/home">
        <ChevronLeft />
      </Link>
      <Quizard />
      <GreenButton>Done</GreenButton>
    </NavBar>
  );
};
