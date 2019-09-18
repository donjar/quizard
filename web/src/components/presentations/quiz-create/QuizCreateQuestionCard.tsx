import React from 'react';
import { IQuizCreateQuestionCardProps } from '../../../interfaces/quiz-create';
import DarkButton from '../common/buttons/DarkButton';
import Card from '../common/Card';

const QuizCreateQuestionCard: React.FC<IQuizCreateQuestionCardProps> = ({
  questionNumber,
  text,
  options,
  correctOption,
  onEraseQuestion,
  onChangeOption,
  onNewOption,
  onEraseOption,
  onSetCorrectAnswer,
  onChangeText
}) => (
  <Card>
    Question {questionNumber}
    <div onClick={onEraseQuestion}>Erase button</div>
    <div>Hamburger</div>
    <input placeholder="Question" value={text} onChange={(e) => onChangeText(e.target.value)} />
    <div>Options</div>
    {options.map((option, idx) => (
      <div key={idx}>
        <input
          type="text"
          placeholder="Answer option"
          value={option}
          onChange={(e) => onChangeOption(idx, e.target.value)}
          required
        />
        <DarkButton onClick={() => onSetCorrectAnswer(idx)}>
          Answer {idx === correctOption ? '(correct)' : ''}
        </DarkButton>
        <div onClick={() => onEraseOption(idx)}>Erase</div>
      </div>
    ))}
    <DarkButton onClick={onNewOption}>+ Add Option</DarkButton>
  </Card>
);

export default QuizCreateQuestionCard;
