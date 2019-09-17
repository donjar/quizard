import React from 'react';
import DarkButton from '../common/buttons/DarkButton';
import Card from '../common/Card';

interface IQuizCreateCardProps {
  questionNumber: number;
  text: string;
  options: string[];
  correctOption: number;
  onEraseQuestion: () => void;
  onChangeOption: (idx: number, newOption: string) => void;
  onNewOption: () => void;
  onEraseOption: (idx: number) => void;
  onSetCorrectAnswer: (idx: number) => void;
}

const QuizCreateCard: React.FC<IQuizCreateCardProps> = ({
  questionNumber, text, options, correctOption, onEraseQuestion, onChangeOption, onNewOption,
  onEraseOption, onSetCorrectAnswer
}) => (
  <Card>
    Question {questionNumber}
    <div onClick={onEraseQuestion}>
      Erase button
    </div>
    <div>
      Hamburger
    </div>
    <div>
      Question: {text}
    </div>
    <div>Options</div>
    {options.map((option, idx) => (
      <div key={idx}>
        <input
          type="text"
          placeholder="Answer option"
          value={option}
          onChange={(e) => onChangeOption(idx, e.target.value)}
          required />
        <DarkButton
          onClick={() => onSetCorrectAnswer(idx)}>Answer {idx === correctOption ? '(correct)' : ''}
        >
        </DarkButton>
        <div onClick={() => onEraseOption(idx)}>Erase</div>
      </div>
    ))}
    <DarkButton onClick={onNewOption}>+ Add Option</DarkButton>
  </Card>
);

export default QuizCreateCard;
