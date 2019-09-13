import React from 'react';
import Body from '../common/Body';
import HomeNavBar from './HomeNavBar';
import styled from 'styled-components';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';

const StyledHome = styled.div`
  height: 100%;
  background: var(--beige);
`;

const StyledHomeBody = styled(Body)`
  padding: 0 15%;
`;

const Home: React.FC = props => {
  return (
    <StyledHome>
      <HomeNavBar />
      <StyledHomeBody>
        <HomeHeader />
        <HomeContent>{props.children}</HomeContent>
      </StyledHomeBody>
    </StyledHome>
  );
};

export default Home;
