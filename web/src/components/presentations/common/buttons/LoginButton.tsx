import React from 'react';
import { Link } from 'react-router-dom';
import DarkButton from './DarkButton';

export const LoginButton: React.FC = () => {
  return (
    <Link to="/home">
      <DarkButton> Login </DarkButton>
    </Link>
  );
};
