import React from 'react';
import styled from 'styled-components';
import { IQuestionOption } from '../../../interfaces/quiz-question';
import { mdMax } from '../../../utils/media';
import QuizQuestionOption from './QuizQuestionOption';

const StyledQuizQuestionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: ${mdMax}) {
    flex-direction: column;
    justify-content: center;
  }

  & > * {
    margin: 5px 10px;

    @media screen and (max-width: ${mdMax}) {
      margin: 5px 0px;
    }
  }
`;

const QuizQuestionText = styled.div`
  flex: 0.55;
  font-weight: lighter;
  font-size: 1.5rem;
`;

const OptionList = styled.div`
  flex: 0.45;
  width: 100%;

  & > * {
    margin: 20px 0;
  }
`;

interface IQuizQuestionContentProps {
  question: string;
  options: IQuestionOption[];
  onSelectOption: (optionIdx: number) => void;
}

const QuizQuestionContent: React.FC<IQuizQuestionContentProps> = ({
  question,
  options,
  onSelectOption
}) => {
  const optionsArray = options.map((option, idx) => (
    <QuizQuestionOption
      displayState={option.displayState}
      onClick={() => onSelectOption(idx)}
    >
      {option.text}
    </QuizQuestionOption>
  ));

  return (
    <StyledQuizQuestionContent>
      <QuizQuestionText>{question}</QuizQuestionText>
      <OptionList>{optionsArray}</OptionList>
    </StyledQuizQuestionContent>
  );
};

export default QuizQuestionContent;
