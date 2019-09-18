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
}

const QuizQuestionOption: React.FC<IQuizQuestionOptionProps> = ({
  displayState,
  onClick,
  children
}) => {

  let OptionButton = AnswerButton;
  switch (displayState) {
    case OPTION_UNSELECTED:
      OptionButton = AnswerButton;
      break;
    case OPTION_CORRECT:
      OptionButton = CorrectAnswerButton;
      break;
    case OPTION_INCORRECT:
      OptionButton = IncorrectAnswerButton;
      break;
  }

  return (
    <StyledQuestionOption>
      <OptionButton onClick={onClick}>{children}</OptionButton>
    </StyledQuestionOption>
  );
};

export default QuizQuestionOption;
