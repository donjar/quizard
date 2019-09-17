import React from 'react';

import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import HomeContent from '../home/HomeContent';
import HomeHeader from '../home/HomeHeader';
import { QuizStartHeader } from './QuizStartHeader';

const QuizStart: React.FC = (props) => {
  return (
    <BeigeBackground>
      <QuizStartHeader />
      <BodyAfterNavBarWithPadding>
        <HomeHeader />
        <HomeContent>{props.children}</HomeContent>
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizStart;
