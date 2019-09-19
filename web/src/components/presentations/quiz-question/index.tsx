import React from 'react';
import styled from 'styled-components';
import { IQuestionOption } from '../../../interfaces/quiz-question';
import { ReactComponent as Medal } from '../../../svg/medal.svg';
import { BeigeBackground } from '../common/BeigeBackground';
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

export interface IQuizQuestionProps {
  questionNumber: number;
  numQuestions: number;
  question: string;
  options: IQuestionOption[];
  onSelectOption: (idx: number) => void;
  onCloseQuiz: () => void;
}

const QuizQuestion: React.FC<IQuizQuestionProps> = ({
   questionNumber,
   numQuestions,
   question,
   options,
   onSelectOption,
   onCloseQuiz
  }) => {
  return (
    <BeigeBackground>
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
          onSelectOption={onSelectOption}
        />
      </StyledQuizBody>
    </BeigeBackground>
  );
};

export default QuizQuestion;
