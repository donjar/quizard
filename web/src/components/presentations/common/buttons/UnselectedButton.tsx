import styled from 'styled-components';
import RoundedButton from './RoundedButton';

const UnselectedButton = styled(RoundedButton)`
  background: none;
  color: var(--dark-blue);
  border: 1px solid var(--dark-blue);
  box-sizing: border-box;
`;

export default UnselectedButton;
