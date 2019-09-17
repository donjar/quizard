import React from 'react';

import { IQuizStartProps } from '../../../interfaces/quiz-start';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import { StartButton } from '../common/buttons/StartButton';
import { CenteredDiv } from '../common/CenteredDiv';
import { QuizStartNavBar } from './QuizStartNavBar';

const QuizStart: React.FC<IQuizStartProps> = ({ quiz }) => {
  const { name, dueDate, description, type } = quiz;

  return (
    <BeigeBackground>
      <QuizStartNavBar />
      <BodyAfterNavBarWithPadding>
        <div>{name}</div>
        <div>{dueDate}</div>
        <div>{description}</div>
        <div>{type}</div>
        <CenteredDiv>
          <StartButton />
        </CenteredDiv>
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizStart;
