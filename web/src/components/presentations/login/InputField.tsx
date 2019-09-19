import React from 'react';
import styled from 'styled-components';
import { IInputFieldProps } from '../../../interfaces/login';
import { smMax } from '../../../utils/media';

const StyledInputField = styled.div`
  position: relative;
  width: 461px;
  height: 66px;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: ${smMax}) {
    width: 100%;
  }

  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(56, 57, 88, 0.4);
  border-radius: 15px;
`;

const StyledInput = styled.input`
  margin: 0 20px;

  outline: none;
  border: none;
  width: 100%;
  height: 100%;

  font-size: 18px;
  line-height: 22px;
`;

const InputField: React.FC<IInputFieldProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <StyledInputField>
      <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </StyledInputField>
  );
};

export default InputField;
