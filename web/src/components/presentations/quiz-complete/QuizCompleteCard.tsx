import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import BigDarkButton from '../common/buttons/BigDarkButton';
import WholeScreenCard from '../common/WholeScreenCard';

const StyledQuizCompleteCard = styled(WholeScreenCard)`
  width: 500px;
  padding: 40px;

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 15px 0;
  }
`;

const StyledOwl = styled(Owl)`
  height: 170px;
`;

export interface IQuizCompleteCardProps {
  score: number;
  maxScore: number;
  quizName: string;
}

const QuizCompleteCard: React.FC<IQuizCompleteCardProps> = ({ score, maxScore, quizName }) => {
  return (
    <StyledQuizCompleteCard>
      <StyledOwl />
      <button>X button</button>
      <h1>You have scored {score}/{maxScore} for {quizName}!</h1>
      <p>
        Your quiz results have been saved and you can review your quiz answers anytime.
      </p>
      <BigDarkButton>Try Again</BigDarkButton>
      <BigDarkButton>Review Quiz Results</BigDarkButton>
      <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
        Back to Home
      </div>
    </StyledQuizCompleteCard>
  );
};

export default QuizCompleteCard;
