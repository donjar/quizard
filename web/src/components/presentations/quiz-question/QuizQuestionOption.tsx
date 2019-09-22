import React from 'react';
import styled from 'styled-components';
import {
  OPTION_CORRECT,
  OPTION_INCORRECT,
  OPTION_UNSELECTED,
  QuestionOptionState
} from '../../../interfaces/quiz-question';
import {
  AnswerButton,
  CorrectAnswerButton,
  IncorrectAnswerButton
} from '../common/buttons/AnswerButton';

const StyledQuestionOption = styled.div`
  width: 100%;
  font-weight: normal;
`;

interface IQuizQuestionOptionProps {
  displayState: QuestionOptionState;
  onClick: () => void;
  disableSelection: boolean;
}

const QuizQuestionOption: React.FC<IQuizQuestionOptionProps> = ({
  displayState,
  onClick,
  disableSelection,
  children
}) => {
  let OptionButton;
  switch (displayState) {
    case OPTION_CORRECT:
      OptionButton = CorrectAnswerButton;
      break;
    case OPTION_INCORRECT:
      OptionButton = IncorrectAnswerButton;
      break;
    case OPTION_UNSELECTED:
    default:
      OptionButton = AnswerButton;
  }

  return (
    <StyledQuestionOption>
      <OptionButton disabled={disableSelection} onClick={onClick}>{children}</OptionButton>
    </StyledQuestionOption>
  );
};

export default QuizQuestionOption;
