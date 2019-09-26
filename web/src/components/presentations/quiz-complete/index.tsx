import React from 'react';
import { IQuizCompleteProps } from '../../../interfaces/quiz-complete';
import FullScreenModal from '../common/FullScreenModal';
import QuizCompleteCard from './QuizCompleteCard';

const QuizComplete: React.FC<IQuizCompleteProps> = ({ score, maxScore, quizName, ...props }) => {
  return (
    <FullScreenModal wide={true}>
      <QuizCompleteCard
        score={score}
        maxScore={maxScore}
        quizName={quizName}
        {...props}
      />
    </FullScreenModal>
  );
};

export default QuizComplete;
