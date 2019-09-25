import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  border: none;
  outline: none;
  padding: 10px 18px;
  cursor: pointer;

  :active {
    transform: translateY(4px);
    box-shadow: 4px 4px 10px rgba(56, 57, 88, 0.25);
  }
`;

export default Button;
