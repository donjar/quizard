import React from 'react';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import HomeHeader from './HomeHeader';
import HomeNavBar from './HomeNavBar';

const Home: React.FC = (props) => {
  return (
    <BeigeBackground>
      <HomeNavBar />
      <BodyAfterNavBarWithPadding>
        <HomeHeader />
        {props.children}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default Home;
