import styled from 'styled-components';

interface IIconButtonProps {
  disabled?: boolean;
}

const IconButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: none;

  :active {
    transform: ${({ disabled }: IIconButtonProps) => disabled ? `none` : `translateY(4px)`};
  }
`;

export default IconButton;
