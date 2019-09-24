import styled from 'styled-components';
import { mdMax } from '../../../utils/media';
import BodyAfterNavBar from './BodyAfterNavBar';

export const BodyAfterNavBarWithPadding = styled(BodyAfterNavBar)`
  padding: 0 15%;

  @media (max-width: ${mdMax}) {
    padding: 0 5%;
  }
`;
