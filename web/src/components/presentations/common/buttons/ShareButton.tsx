import React from 'react';
import { Share2 as Share } from 'react-feather';
import DarkButton from './DarkButton';

interface IShareButtonProps {
  onClick: () => void;
}

const ShareButton: React.FC<IShareButtonProps> = ({ onClick }) => {
  return (
    <DarkButton onClick={onClick}>
      <Share />
    </DarkButton>
  );
};

export default ShareButton;
