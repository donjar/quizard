import React from 'react';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IQuizCreateNavBarProps } from '../../../interfaces/quiz-create/index';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import GreenButton from '../common/buttons/GreenButton';
import NakedButton from '../common/buttons/NakedButton';
import NavBar from '../common/NavBar';

const StyledNavBar = styled(NavBar)`
  position: fixed;
`;

export const QuizCreateNavBar: React.FC<IQuizCreateNavBarProps> = ({
  onCreateQuiz
}) => {
  return (
    <StyledNavBar background={'var(--beige)'} fixed={true}>
      <Link to="/home">
        <NakedButton><ChevronLeft /></NakedButton>
      </Link>
      <Quizard />
      <GreenButton onClick={onCreateQuiz}>Done</GreenButton>
    </StyledNavBar>
  );
};
