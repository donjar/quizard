import React from 'react';
import FullScreenModal from '../common/FullScreenModal';
import QuizCompleteCard from './QuizCompleteCard';
import { IQuizCompleteProps } from '../../../interfaces/quiz-complete';

const QuizComplete: React.FC<IQuizCompleteProps> = ({ score, maxScore, quizName }) => {
  return (
    <FullScreenModal wide={true}>
      <QuizCompleteCard
        score={score}
        maxScore={maxScore}
        quizName={quizName}
      />
    </FullScreenModal>
  );
};

export default QuizComplete;
