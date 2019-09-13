import React from 'react';
import Body from '../common/Body';
import HomeNavBar from './HomeNavBar';
import styled from 'styled-components';

const StyledHome = styled.div`
  height: 100%;
  background: var(--beige);
`;

const Home: React.FC = () => {
  return (
    <StyledHome>
      <HomeNavBar />
      <Body className="Home">homepage</Body>
    </StyledHome>
  );
};

export default Home;
