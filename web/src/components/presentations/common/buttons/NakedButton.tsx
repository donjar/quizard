import styled from 'styled-components';
import Button from './Button';

const NakedButton = styled(Button)`
  :active {
    box-shadow: none;
  }
`;

export default NakedButton;
