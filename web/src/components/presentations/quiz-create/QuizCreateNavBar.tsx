import React from 'react';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { IQuizCreateNavBarProps } from '../../../interfaces/quiz-create/index';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import GreenButton from '../common/buttons/GreenButton';
import NavBar from '../common/NavBar';

export const QuizCreateNavBar: React.FC<IQuizCreateNavBarProps> = ({
  onCreateQuiz
}) => {
  return (
    <NavBar background={'var(--beige)'}>
      <Link to="/home">
        <ChevronLeft />
      </Link>
      <Quizard />
      <GreenButton onClick={onCreateQuiz}>Done</GreenButton>
    </NavBar>
  );
};
