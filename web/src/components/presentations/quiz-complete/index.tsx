import React from 'react';
import FullScreenModal from '../common/FullScreenModal';
import QuizCompleteCard from './QuizCompleteCard';

const QuizComplete: React.FC = ({ score, maxScore, quizName, props }: any) => {
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
