import styled from 'styled-components';

const IconButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: none;

  :active {
    transform: translateY(4px);
  }
`;

export default IconButton;
