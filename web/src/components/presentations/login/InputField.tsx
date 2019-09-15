import React from 'react';
import styled from 'styled-components';

const StyledInputField = styled.div`
  position: relative;
  width: 461px;
  height: 66px;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 576px) {
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

  font-size: 18px;
  line-height: 22px;
`;

interface IInputFieldProps {
  type: string;
  placeholder: string;
}

const InputField: React.FC<IInputFieldProps> = ({ type, placeholder }) => {
  return (
    <StyledInputField>
      <StyledInput type={type} placeholder={placeholder} />
    </StyledInputField>
  );
};

export default InputField;
