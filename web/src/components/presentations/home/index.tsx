import React from 'react';
import { IHomeProps } from '../../../interfaces/home';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import HomeHeader from './HomeHeader';
import HomeNavBar from './HomeNavBar';

const Home: React.FC<IHomeProps> = (props) => {
  return (
    <BeigeBackground>
      <HomeNavBar onLogout={props.onLogout} />
      <BodyAfterNavBarWithPadding>
        <HomeHeader />
        {props.children}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default Home;
