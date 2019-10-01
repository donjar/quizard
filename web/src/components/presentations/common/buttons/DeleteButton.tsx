import React from 'react';
import { Trash2 as Delete } from 'react-feather';
import styled from 'styled-components';
import IconButton from './IconButton';

const defaultDeleteBtnColor = `var(--red)`;
const disabledDeleteBtnColor = `var(--light-grey)`;

interface IDeleteIconProps {
  disabled: boolean;
}

const StyledDelete = styled(Delete)`
  color: ${({ disabled }: IDeleteIconProps) => disabled ? disabledDeleteBtnColor : defaultDeleteBtnColor};
  cursor: ${({ disabled }: IDeleteIconProps) => disabled ? `default` : `pointer`};
`;

interface IDeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const DeleteButton: React.FC<IDeleteButtonProps> = ({ onClick, disabled }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <StyledDelete disabled={disabled || false}/>
    </IconButton>
  );
};

export default DeleteButton;
