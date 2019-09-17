import React from 'react';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';

import NavBar from '../common/NavBar';

export const QuizStartNavBar: React.FC = () => {
  return (
    <NavBar background={'var(--beige)'}>
      <Quizard />
    </NavBar>
  );
};
