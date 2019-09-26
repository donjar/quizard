import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IQuizCompleteCardProps } from '../../../interfaces/quiz-complete';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import QuizRedoButtonContainer from '../../containers/quiz-complete/QuizRedoButtonContainer';
import BigDarkButton from '../common/buttons/BigDarkButton';
import UnderlineButton from '../common/buttons/UnderlineButton';

const StyledOwl = styled(Owl)`
  height: 170px;
`;

const QuizCompleteCard: React.FC<IQuizCompleteCardProps> = ({ score, maxScore, quizName, match }) => {
  return (
    <>
      <StyledOwl />
      <h3>
        You have scored {score}/{maxScore} for {quizName}!
      </h3>
      <p style={{ fontWeight: 300 }}>
        Your quiz results have been saved and you can review your quiz answers
        anytime.
      </p>
      <QuizRedoButtonContainer />
      <Link to={`/quiz-review/${match.params.id || ''}`}>
        <BigDarkButton>Review Quiz Results</BigDarkButton>
      </Link>
      <Link to="/">
        <UnderlineButton>Back to Home</UnderlineButton>
      </Link>
    </>
  );
};

export default QuizCompleteCard;
