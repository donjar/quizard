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
  correctOption
}) => {
  const optionsDiv = options.map((op, optionIdx) => {
    return (
      <ul>
        <li>{op}{optionIdx === correctOption ? ' (correct)' : ''}</li>
      </ul>
    );
  });

  return (
    <StyledQuestionSection>
      <div>
        <h3>Question {questionNumber}</h3>
        <p>{text}</p>
      </div>
      <div>
        {optionsDiv}
      </div>
    </StyledQuestionSection>
  );
};

export default QuestionSection;
