import React from 'react';
import { Trash2 as Delete } from 'react-feather';
import styled from 'styled-components';
import IconButton from './IconButton';

const StyledDelete = styled(Delete)`
    color: var(--red);
`;

interface IDeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<IDeleteButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <StyledDelete />
    </IconButton>
  );
};

export default DeleteButton;
