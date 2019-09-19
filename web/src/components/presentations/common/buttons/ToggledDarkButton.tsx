import React from 'react';
import { IToggleButtonProps } from '../../../../interfaces/common';
import DarkButton from './DarkButton';
import UnselectedButton from './UnselectedButton';

export const ToggledDarkButton: React.FC<IToggleButtonProps> = ({
  isSelected,
  onClick,
  children
}) => {
  return isSelected ? (
    <DarkButton onClick={onClick}>{children}</DarkButton>
  ) : (
    <UnselectedButton onClick={onClick}>{children}</UnselectedButton>
  );
};
