import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IQuestionOption } from '../../../interfaces/quiz-question';
import { mdMax } from '../../../utils/media';
import GreenButton from '../common/buttons/GreenButton';
import QuizQuestionOption from './QuizQuestionOption';

const StyledQuizQuestionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuizArea = styled.div`
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

interface IHiddenButtonProps {
  show: boolean;
}

const HidableButton = styled(GreenButton)`
  align-self: flex-end;
  display: ${({ show }: IHiddenButtonProps) => show ? `block` : `none`};
  margin: 5px 10px;

  @media screen and (max-width: ${mdMax}) {
    margin: 5px 0px;
  }
`;

interface IQuizQuestionContentProps {
  question: string;
  options: IQuestionOption[];
  disableSelection: boolean;
  showNext: boolean;
  showDone: boolean;
  onSelectOption: (optionIdx: number) => void;
  onClickNext: () => void;
}

const QuizQuestionContent: React.FC<IQuizQuestionContentProps> = ({
  question,
  options,
  disableSelection,
  showNext,
  showDone,
  onSelectOption,
  onClickNext
}) => {
  const optionsArray = options.map((option, idx) => (
    <QuizQuestionOption
      displayState={option.displayState}
      onClick={() => onSelectOption(idx)}
      disableSelection={disableSelection}
    >
      {option.text}
    </QuizQuestionOption>
  ));

  return (
    <StyledQuizQuestionContent>
      <QuizArea>
        <QuizQuestionText>{question}</QuizQuestionText>
        <OptionList>{optionsArray}</OptionList>
      </QuizArea>
      <HidableButton show={showNext} onClick={onClickNext}>Next</HidableButton>
      <Link to="/quiz-complete">
        <HidableButton show={showDone}>Done</HidableButton>
      </Link>
    </StyledQuizQuestionContent>
  );
};

export default QuizQuestionContent;
