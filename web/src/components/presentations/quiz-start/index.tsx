import React from 'react';

import styled from 'styled-components';
import { IQuizStartProps } from '../../../interfaces/quiz-start';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import { StartButton } from '../common/buttons/StartButton';
import { CenteredDiv } from '../common/CenteredDiv';
import { QuizStartNavBar } from './QuizStartNavBar';

const BoldedText = styled.span`
  font-weight: bold;
`;

const StyledBody = styled(BodyAfterNavBarWithPadding)`
  * {
    margin: 20px 0;
  }
`;

const QuizStart: React.FC<IQuizStartProps> = ({ quiz, isNewQuiz, onStartClick }) => {
  const { name, description } = quiz;

  return (
    <BeigeBackground>
      <QuizStartNavBar />
      <StyledBody>
        <h1>{name}</h1>
        <div>{description}</div>
        <div>
          <BoldedText>Quiz rules:</BoldedText> MCQ format, first option you
          select will be recorded as your answer
        </div>
        <CenteredDiv>
          {isNewQuiz ? (
            <StartButton onClick={onStartClick}>Start</StartButton>
          ) : (
            <StartButton onClick={onStartClick}>Continue</StartButton>
          )}
        </CenteredDiv>
      </StyledBody>
    </BeigeBackground>
  );
};

export default QuizStart;
