import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import BigDarkButton from '../common/buttons/BigDarkButton';

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
    <>
      <StyledOwl />
      <button>X button</button>
      <h1>
        You have scored {score}/{maxScore} for {quizName}!
      </h1>
      <p>
        Your quiz results have been saved and you can review your quiz answers
        anytime.
      </p>
      <BigDarkButton>Try Again</BigDarkButton>
      <BigDarkButton>Review Quiz Results</BigDarkButton>
      <Link to="/">
        <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
          Back to Home
        </div>
      </Link>
    </>
  );
};

export default QuizCompleteCard;
