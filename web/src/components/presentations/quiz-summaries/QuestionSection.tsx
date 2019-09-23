import React from 'react';
import styled from 'styled-components';
import { IQuestionSectionProps } from '../../../interfaces/quiz-create-summary';

const StyledQuestionSection = styled.section`
  background-color: #fff;
  padding: 10px;
  border: 1px solid #000;
  margin: 10px 0;
`;

const QuestionSection: React.FC<IQuestionSectionProps> = ({
  questionNumber,
  text,
  options,
  correctOption,
  selectedOption
}) => {
  const optionsLi = options.map((op, optionIdx) => {
    return (
      <li key={optionIdx}>{op}{
        optionIdx === correctOption ? ' (correct)' : ''
      }{
        optionIdx === selectedOption ? ' (selected)' : ''
      }</li>
    );
  });

  return (
    <StyledQuestionSection key={questionNumber}>
      <div>
        <h3>Question {questionNumber}</h3>
        <p>{text}</p>
      </div>
      <div>
        <ul>
          {optionsLi}
        </ul>
      </div>
    </StyledQuestionSection>
  );
};

export default QuestionSection;
