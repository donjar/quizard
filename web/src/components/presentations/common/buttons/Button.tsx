import styled from 'styled-components';

const Button = styled.button`
  font-size: 18px;
  border: none;
  outline: none;
  width: 130px;
  height: 48px;

  :active {
    transform: translateY(4px);
  }
`;

export default Button;
