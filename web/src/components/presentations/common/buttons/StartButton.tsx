import React from 'react';
import { Link } from 'react-router-dom';
import DarkButton from './DarkButton';

export const StartButton: React.FC<any> = (props) => {
  return (
    <DarkButton {...props}>{props.children}</DarkButton>
  );
};
