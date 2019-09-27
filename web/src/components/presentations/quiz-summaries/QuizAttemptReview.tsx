import React from 'react';

import { IQuizAttemptReviewProps } from '../../../interfaces/quiz-create-summary/index';
import QuizRedoButtonContainer from '../../containers/quiz-complete/QuizRedoButtonContainer';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import { NavBarWithBack } from '../common/NavBarWithBack';
import QuestionSection from './QuestionSection';

const QuizAttemptReview: React.FC<IQuizAttemptReviewProps> = ({
  name,
  description,
  score,
  questions,
  match
}) => {
  const numQuestions = questions.length;
  const questionCards = (questions || []).map((qn) => QuestionSection(qn));
  return (
    <BeigeBackground>
      <NavBarWithBack />
      <BodyAfterNavBarWithPadding>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Score: {score}/{numQuestions}</p>
        <QuizRedoButtonContainer quizId={match.params.id} />
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizAttemptReview;
