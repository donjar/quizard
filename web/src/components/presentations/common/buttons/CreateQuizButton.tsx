import React from 'react';
import { Link } from 'react-router-dom';
import BigDarkButton from './BigDarkButton';

export const CreateQuizButton: React.FC = () => {
  return (
    <Link to="/quiz-create">
      <BigDarkButton>Create New Quiz</BigDarkButton>
    </Link>
  );
};
