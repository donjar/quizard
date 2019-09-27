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
  width: ${mdMin};

  @media (max-width: ${mdMax}) {
    width: calc(100% - 1em);
  }
`;

export const BodyAfterNavBarWithPadding: React.FC = (props) => (
  <StyledBodyAfterNavBar>
    <InnerBody>
      {props.children}
    </InnerBody>
  </StyledBodyAfterNavBar>
);
