import React from 'react';
import FullScreenModal from '../common/FullScreenModal';
import QuizCompleteCard from './QuizCompleteCard';

const QuizComplete: React.FC = () => {
  return (
    <FullScreenModal wide={true}>
      <QuizCompleteCard score={8} maxScore={10} quizName={'Quiz Name Here'} />
    </FullScreenModal>
  );
};

export default QuizComplete;
