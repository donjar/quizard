import styled from 'styled-components';
import { smMax } from '../../../utils/media';

const WholeScreenCard = styled.div`
  background: var(--beige);
  box-shadow: 6px 6px 0px var(--dark-beige);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${smMax}) {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
`;

export default WholeScreenCard;
