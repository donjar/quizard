import React from 'react';

import { Users } from 'react-feather';
import styled from 'styled-components';
import { IQuizCreateSummaryProps } from '../../../interfaces/quiz-create-summary/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import ShareButton from '../common/buttons/ShareButton';
import { NavBarWithBack } from '../common/NavBarWithBack';
import QuestionSection from './QuestionSection';

const NameDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NameTextHeader = styled.h2`
  word-break: break-all;
`;

const onClickShareButton = (link: string) => {
  // Show share modal
  console.log(link);
};

const QuizCreateSummary: React.FC<IQuizCreateSummaryProps> = ({
  name,
  description,
  numAttempts,
  questions,
  sharableLink,
}) => {
  const questionCards = (questions || []).map((qn) => QuestionSection(qn));
  return (
    <BeigeBackground>
      <NavBarWithBack />
      <BodyAfterNavBarWithPadding>
        <NameDiv>
          <NameTextHeader>{name}</NameTextHeader>
          <ShareButton onClick={() => onClickShareButton(sharableLink)} />
        </NameDiv>
        <p>{description}</p>
        <p><Users /> {numAttempts} people attempted</p>
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreateSummary;
