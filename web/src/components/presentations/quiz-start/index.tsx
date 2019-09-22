import React from 'react';

import { IQuizStartProps } from '../../../interfaces/quiz-start';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import { StartButton } from '../common/buttons/StartButton';
import { CenteredDiv } from '../common/CenteredDiv';
import { QuizStartNavBar } from './QuizStartNavBar';

const QuizStart: React.FC<IQuizStartProps> = ({ quiz }) => {
  const { name, description } = quiz;

  return (
    <BeigeBackground>
      <QuizStartNavBar />
      <BodyAfterNavBarWithPadding>
        <div>{name}</div>
        <div>{description}</div>
        <CenteredDiv>
          <StartButton />
        </CenteredDiv>
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizStart;
