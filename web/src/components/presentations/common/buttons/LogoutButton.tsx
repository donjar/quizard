import React from 'react';
import DarkButton from './DarkButton';
import { Link } from 'react-router-dom';

export const LogoutButton: React.FC = () => {
  return (
    <>
      <Link to="/login">
        <DarkButton> Logout </DarkButton>
      </Link>
    </>
  );
};
