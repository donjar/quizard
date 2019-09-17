import styled from 'styled-components';

const smMax = '575px';
const mdMax = '767px';

const HideOnMedium = styled.div`
  @media (max-width: ${mdMax}) {
    display: none;
  }
`;

export { smMax, mdMax, HideOnMedium };
