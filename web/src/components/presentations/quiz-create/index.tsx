import React from 'react';

import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import HomeContent from '../home/HomeContent';
import HomeHeader from '../home/HomeHeader';
import { QuizCreateHeader } from './QuizCreateHeader';

const QuizCreate: React.FC = (props) => {
  return (
    <BeigeBackground>
      <QuizCreateHeader />
      <BodyAfterNavBarWithPadding>
        <HomeHeader />
        <HomeContent>{props.children}</HomeContent>
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreate;
