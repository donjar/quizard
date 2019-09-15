import styled from 'styled-components';

const Button = styled.button`
  font-size: 18px;
  border: none;
  outline: none;
  width: 130px;
  height: 48px;
  cursor: pointer;

  :active {
    transform: translateY(4px);
    box-shadow: 4px 4px 10px rgba(56, 57, 88, 0.25);
  }
`;

export default Button;
