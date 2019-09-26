import React from 'react';
import styled from 'styled-components';
import { mdMax, mdMin } from '../../../utils/media';
import BodyAfterNavBar from './BodyAfterNavBar';

const StyledBodyAfterNavBar = styled(BodyAfterNavBar)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InnerBody = styled.div`
  // padding: 0 20%;
  width: ${mdMin};

  @media (max-width: ${mdMax}) {
    padding: 0 5%;
  }
`;

export const BodyAfterNavBarWithPadding: React.FC = (props) => (
  <StyledBodyAfterNavBar>
    <InnerBody>
      {props.children}
    </InnerBody>
  </StyledBodyAfterNavBar>
);
