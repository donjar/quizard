import React from 'react';

import { Redirect } from 'react-router';
import styled from 'styled-components';
import { IQuizCreateProps } from '../../../interfaces/quiz-create/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import FloatingButton from '../common/buttons/FloatingButton';
import withError from '../common/WithError';
import { QuizCreateNavBar } from './QuizCreateNavBar';

const StyledBeigeBackground = styled(BeigeBackground)`
  padding-bottom: 15px;
`;

const NameInput = withError(styled.input`
  font-size: 1.8rem;
  font-weight: lighter;
  padding: 10px;
  width: calc(100% - 20px);
  background: none;

  border: transparent;
  border-bottom: 1px solid var(--dark-grey);
`);

const DescriptionTextArea = withError(styled.textarea`
  margin-top: 10px;
  padding: 0 10px;
  width: calc(100% - 20px);
  font-size: 1.2rem;
  font-weight: lighter;
  background: none;

  border: transparent;
  border-bottom: 1px solid var(--dark-grey);

  resize: none;
`);

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
    <StyledBeigeBackground>
      <QuizCreateNavBar onCreateQuiz={onCreateQuiz} />
      <BodyAfterNavBarWithPadding>
        <NameInput
          type="text"
          name="name"
          placeholder="Quiz Name"
          value={name}
          onChange={(e: any) => onChangeName(e.target.value)}
          error={error && error.title}
          required
        />
        <DescriptionTextArea
          placeholder="Quiz Description"
          value={description}
          rows={3}
          error={error && error.description}
          onChange={(e: any) => onChangeDescription(e.target.value)}
        />

        <h3>Questions ({numQuestions})</h3>
        <FloatingButton onClick={onAddQuestion}>+ Add Question</FloatingButton>
        {children}
      </BodyAfterNavBarWithPadding>
    </StyledBeigeBackground>
  );
};

export default QuizCreate;
