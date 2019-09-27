import styled from 'styled-components';
import Button from './Button';

const NakedButton = styled(Button)`
  padding: 10px;

  :active {
    box-shadow: none;
  }
`;

export default NakedButton;
