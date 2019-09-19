import React from 'react';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import NavBar from '../common/NavBar';

const QuizNavBar: React.FC = () => {
  return (
    <NavBar background={`var(--beige)`}>
      <Quizard />
    </NavBar>
  );
};

export default QuizNavBar;
