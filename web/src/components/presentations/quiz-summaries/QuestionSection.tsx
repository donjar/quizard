import React from 'react';
import styled from 'styled-components';
import { IQuestionSectionProps } from '../../../interfaces/quiz-create-summary';
import { mdMax } from '../../../utils/media';
import QuizSectionOption from './QuizSectionOption';

const StyledQuestionSection = styled.section`
  background-color: none;
  padding: 10px;
  border-top: 1px solid var(--light-grey);
  margin: 10px 0;

  display: flex;
  flex-direction: column;
`;

const QuestionArea = styled.div`
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

const QuestionSection: React.FC<IQuestionSectionProps> = ({
  questionNumber,
  text,
  options,
  correctOption,
  selectedOption
}) => {
  const optionsArray = options.map((op, optionIdx) => {
    return (
      <QuizSectionOption
        isCorrect={optionIdx === correctOption}
        isSelected={optionIdx === selectedOption}
        key={optionIdx}
      >
        {op}
      </QuizSectionOption>
    );
  });

  return (
    <StyledQuestionSection key={questionNumber}>
      <h3>Question {questionNumber}</h3>
      <QuestionArea>
        <QuizQuestionText>{text}</QuizQuestionText>
        <OptionList>{optionsArray}</OptionList>
      </QuestionArea>
    </StyledQuestionSection>
  );
};

export default QuestionSection;
