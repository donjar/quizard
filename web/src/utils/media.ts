import styled from 'styled-components';

const smMax = '767.98px';
const mdMin = '768px';
const mdMax = '991.98px';
const lgMax = '1199.98px';

const HideOnSmall = styled.div`
  @media (max-width: ${smMax}) {
    display: none;
  }
`;

export { smMax, mdMin, mdMax, lgMax, HideOnSmall };
