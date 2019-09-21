import React from 'react';

import { Redirect } from 'react-router';
import { IQuizCreateProps } from '../../../interfaces/quiz-create/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import DarkButton from '../common/buttons/DarkButton';
import { QuizCreateNavBar } from './QuizCreateNavBar';

const QuizCreate: React.FC<IQuizCreateProps> = ({
  name,
  error,
  numQuestions,
  onAddQuestion,
  onChangeName,
  onCreateQuiz,
  createdQuizId,
  children
}) => {
  if (createdQuizId) {
    return (<Redirect to={`/quiz-create-summary/${createdQuizId}`} />);
  }

  return (
    <BeigeBackground>
      <QuizCreateNavBar onCreateQuiz={onCreateQuiz} />
      <BodyAfterNavBarWithPadding>
        <input
          type="text"
          name="name"
          placeholder="Quiz Name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          required
        />
        <h3>Questions ({numQuestions})</h3>
        <DarkButton onClick={onAddQuestion}>Add Question</DarkButton>
        {error && (<p>Error: {error}</p>)}
        {children}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreate;
