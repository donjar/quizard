import React from 'react';
import styled from 'styled-components';
import {
  QuestionOptionButton,
  CorrectQuestionOptionButton,
  IncorrectQuestionOptionButton
} from '../common/buttons/QuestionOptionButton';

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
    Option = CorrectQuestionOptionButton;
  } else if (isSelected) {
    Option = IncorrectQuestionOptionButton;
  } else {
    Option = QuestionOptionButton;
  }

  return (
    <StyledQuestionOption>
      <Option style={{ cursor: 'default' }} disabled={true}>{children}</Option>
    </StyledQuestionOption>
  );
};

export default QuizSectionOption;
