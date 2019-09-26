import React from 'react';
import styled from 'styled-components';
import { IQuestionOption } from '../../../interfaces/quiz-question';
import { ReactComponent as Medal } from '../../../svg/medal.svg';
import { ReactComponent as SadOwl } from '../../../svg/owl-sad.svg';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { mdMax } from '../../../utils/media';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import CloseButton from '../common/buttons/CloseButton';
import QuizNavBar from './QuizNavBar';
import QuizProgressBar from './QuizProgressBar';
import QuizQuestionContent from './QuizQuestionContent';

const StyledQuizBody = styled(BodyAfterNavBarWithPadding)`
  h1 {
    font-size: 1.8rem;
    font-weight: normal;
  }
`;

const StyledQuizHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomRightOwl = styled(Owl)`
  position: fixed;
  bottom: calc(-9vh - 3vw);
  right: calc(-9vh - 3vw);
  width: calc(30vh + 10vw);

  @media (max-width: ${mdMax}) {
    display: none;
  }
`;

const BottomRightSadOwl = styled(SadOwl)`
  position: fixed;
  bottom: calc(-9vh - 3vw);
  right: calc(-9vh - 3vw);
  width: calc(30vh + 10vw);

  @media (max-width: ${mdMax}) {
    display: none;
  }
`;

export interface IQuizQuestionProps {
  questionNumber: number;
  numQuestions: number;
  question: string;
  options: IQuestionOption[];
  disableSelection: boolean;
  showNext: boolean;
  happyOwl: boolean;
  onSelectOption: (idx: number) => void;
  onCloseQuiz: () => void;
  onClickNext: () => void;
}

const QuizQuestion: React.FC<IQuizQuestionProps> = ({
  questionNumber,
  numQuestions,
  question,
  options,
  disableSelection,
  showNext,
  happyOwl,
  onSelectOption,
  onCloseQuiz,
  onClickNext
}) => {
  return (
    <>
      <QuizNavBar />
      <StyledQuizBody>
        <StyledQuizHeader>
          <CloseButton onClick={onCloseQuiz} />
          <QuizProgressBar now={questionNumber} total={numQuestions} />
          <Medal />
        </StyledQuizHeader>
        <h1>Question {questionNumber}</h1>
        <QuizQuestionContent
          question={question}
          options={options}
          disableSelection={disableSelection}
          showNext={showNext}
          onSelectOption={onSelectOption}
          onClickNext={onClickNext}
        />
        {
          happyOwl
          ? (<BottomRightOwl />)
          : (<BottomRightSadOwl />)
        }
      </StyledQuizBody>
    </>
  );
};

export default QuizQuestion;
