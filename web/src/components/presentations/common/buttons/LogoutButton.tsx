import React from 'react';
import { Link } from 'react-router-dom';
import DarkButton from './DarkButton';

export const LogoutButton: React.FC = () => {
  return (
    <>
      <Link to="/login">
        <DarkButton>Logout</DarkButton>
      </Link>
    </>
  );
};
