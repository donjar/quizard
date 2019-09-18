import styled from 'styled-components';
import { smMax } from '../../../utils/media';

const WholeScreenCard = styled.div`
  background: #fffcf3;
  box-shadow: 6px 6px 0px #dcd9cf;
  border-radius: 25px;

  @media (max-width: ${smMax}) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;

export default WholeScreenCard;
