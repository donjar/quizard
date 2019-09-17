import React from 'react';

import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import HomeContent from '../home/HomeContent';
import HomeHeader from '../home/HomeHeader';
import { QuizCreateNavBar } from './QuizCreateNavBar';

const QuizCreate: React.FC = (props) => {
  return (
    <BeigeBackground>
      <QuizCreateNavBar />
      <BodyAfterNavBarWithPadding>
        <HomeHeader />
        <HomeContent>{props.children}</HomeContent>
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreate;
