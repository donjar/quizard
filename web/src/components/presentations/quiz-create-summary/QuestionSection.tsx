import React from 'react';
import { IQuestionSectionProps } from '../../../interfaces/quiz-create-summary';

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
    <section>
      <div>
        <h3>Question {questionNumber}</h3>
        <p>{text}</p>
      </div>
      <div>
        {optionsDiv}
      </div>
    </section>
  );
};

export default QuestionSection;
