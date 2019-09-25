import React from 'react';
import { Check } from 'react-feather';
import styled from 'styled-components';
import RoundedButton from './RoundedButton';

const GreyButton = styled(RoundedButton)`
  background: #bbb;
  border: none;
  color: white;

  padding: 5px 15px;
  margin: 6px 0;

  display: flex;
  align-items: center;

  text-align: center;
  overflow-wrap: break-word;
  font-size: 0.8rem;

  :active {
    transform: none;
    box-shadow: none;
  }
`;

const GreenButton = styled(GreyButton)`
  background: var(--green);
  box-shadow: 0px 0px 10px var(--green);
`;

const StyledCheck = styled(Check)`
  height: 1.4em;
`;

interface IAnswerButtonProps {
  onClick: () => void;
}

export const AnswerButton: React.FC<IAnswerButtonProps> = ({ onClick }) => {
  return (
    <GreyButton onClick={onClick}>
      <StyledCheck /> Answer
    </GreyButton>
  );
};

export const SelectedAnswerButton: React.FC<IAnswerButtonProps> = ({ onClick }) => {
  return (
    <GreenButton onClick={onClick}>
      <StyledCheck /> Answer
    </GreenButton>
  );
};
