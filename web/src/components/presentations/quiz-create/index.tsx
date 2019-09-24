import React from 'react';

import { Redirect } from 'react-router';
import { IQuizCreateProps } from '../../../interfaces/quiz-create/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import FloatingButton from '../common/buttons/FloatingButton';
import { QuizCreateNavBar } from './QuizCreateNavBar';
import styled from 'styled-components';

const NameInput = styled.input`
  width: 100%;
  font-size: 1.8rem;
  font-weight: lighter;
  padding: 10px;
  background: none;

  border: transparent;
  border-bottom: 1px solid var(--dark-grey);
`;

const DescriptionTextArea = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  font-size: 1.2rem;
  font-weight: lighter;
  padding: 10px;
  background: none;

  border: transparent;
  border-bottom: 1px solid var(--dark-grey);
`;

const QuizCreate: React.FC<IQuizCreateProps> = ({
  name,
  description,
  error,
  numQuestions,
  onAddQuestion,
  onChangeName,
  onChangeDescription,
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
        <NameInput
          type="text"
          name="name"
          placeholder="Quiz Name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          required
        />
        <DescriptionTextArea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
        />
        {error && (<p>Error: {error}</p>)}

        <h3>Questions ({numQuestions})</h3>
        <FloatingButton onClick={onAddQuestion}>+ Add Question</FloatingButton>
        {children}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreate;
