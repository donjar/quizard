import React from 'react';
import styled from 'styled-components';
import Body from '../common/Body';
import HomeContent from './HomeContent';
import HomeHeader from './HomeHeader';
import HomeNavBar from './HomeNavBar';

const StyledHome = styled.div`
  height: 100%;
  background: var(--beige);
`;

const StyledHomeBody = styled(Body)`
  padding: 0 15%;
`;

const Home: React.FC = (props) => {
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
