import React from 'react';
import styled from 'styled-components';
import {
  AnswerButton,
  CorrectAnswerButton,
  IncorrectAnswerButton
} from '../common/buttons/AnswerButton';

const StyledQuestionOption = styled.div`
  width: 100%;
  font-weight: normal;
`;

interface IQuizSectionOptionProps {
  isCorrect: boolean;
  isSelected?: boolean;
}

const QuizSectionOption: React.FC<IQuizSectionOptionProps> = ({
  isCorrect,
  isSelected,
  children
}) => {
  let Option;
  if (isCorrect) {
    Option = CorrectAnswerButton;
  } else if (isSelected) {
    Option = IncorrectAnswerButton;
  } else {
    Option = AnswerButton;
  }

  return (
    <StyledQuestionOption>
      <Option style={{ cursor: 'default' }} disabled={true}>{children}</Option>
    </StyledQuestionOption>
  );
};

export default QuizSectionOption;
