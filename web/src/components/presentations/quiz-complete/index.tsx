import React from 'react';
import styled from 'styled-components';
import QuizCompleteCard from './QuizCompleteCard';

const StyledQuizCompletePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark-blue);
  height: 100vh;
`;

const QuizComplete: React.FC = () => {
  return (
    <StyledQuizCompletePage>
      <QuizCompleteCard score={8} maxScore={10} isGood={true} quizName={'Quiz Name Here'} />
    </StyledQuizCompletePage>
  );
};

export default QuizComplete;
