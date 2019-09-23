import React from 'react';

import { IQuizCreateSummaryProps } from '../../../interfaces/quiz-create-summary/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import { NavBarWithBack } from '../common/NavBarWithBack';
import QuestionSection from './QuestionSection';

const QuizCreateSummary: React.FC<IQuizCreateSummaryProps> = ({
  name,
  description,
  numAttempts,
  questions,
}) => {
  const questionCards = (questions || []).map((qn) => QuestionSection(qn));
  return (
    <BeigeBackground>
      <NavBarWithBack />
      <BodyAfterNavBarWithPadding>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{numAttempts} people attempted</p>
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreateSummary;
