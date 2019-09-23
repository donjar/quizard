import React from 'react';
import DarkButton from './DarkButton';

export const StartButton: React.FC<any> = (props) => {
  return (
    <DarkButton {...props}>{props.children}</DarkButton>
  );
};
