import React from 'react';

import { IQuizAttemptReviewProps } from '../../../interfaces/quiz-create-summary/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import QuestionSection from './QuestionSection';
import { NavBarWithBack } from '../common/NavBarWithBack';

const QuizAttemptReview: React.FC<IQuizAttemptReviewProps> = ({
  name,
  description,
  score,
  questions
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
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizAttemptReview;
