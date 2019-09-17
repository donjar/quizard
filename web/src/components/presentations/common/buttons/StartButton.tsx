import React from 'react';
import { Link } from 'react-router-dom';
import DarkButton from './DarkButton';

export const StartButton: React.FC = () => {
  return (
    <Link to="/quiz">
      <DarkButton> START </DarkButton>
    </Link>
  );
};
