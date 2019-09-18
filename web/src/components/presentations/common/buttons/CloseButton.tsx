import React from 'react';
import { X as Close } from 'react-feather';
import IconButton from './IconButton';

interface ICloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<ICloseButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <Close />
    </IconButton>
  );
};

export default CloseButton;
