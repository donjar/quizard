import React from 'react';

import { IQuizCreateProps } from '../../../interfaces/quiz-create/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import DarkButton from '../common/buttons/DarkButton';
import { QuizCreateNavBar } from './QuizCreateNavBar';

const QuizCreate: React.FC<IQuizCreateProps> = ({
  numQuestions,
  onAddQuestion,
  children
}) => {
  return (
    <BeigeBackground>
      <QuizCreateNavBar />
      <BodyAfterNavBarWithPadding>
        <input type="text" name="name" placeholder="Quiz Name" required />
        <input
          type="text"
          name="description"
          placeholder="Quiz Description"
          required
        />
        <h3>Questions ({numQuestions})</h3>
        <DarkButton onClick={onAddQuestion}>Add Question</DarkButton>
        {children}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreate;
