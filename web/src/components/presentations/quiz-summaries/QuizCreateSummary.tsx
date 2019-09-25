import React from 'react';

import { IQuizCreateSummaryProps } from '../../../interfaces/quiz-create-summary/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import { NavBarWithBack } from '../common/NavBarWithBack';
import QuestionSection from './QuestionSection';
import styled from 'styled-components';
import ShareButton from '../common/buttons/ShareButton';
import { Users } from 'react-feather';

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

const onClickShareButton = () => {
  // Show share modal
};

const QuizCreateSummary: React.FC<IQuizCreateSummaryProps> = ({
  name,
  description,
  numAttempts,
  questions,
  // sharableLink,
}) => {
  const questionCards = (questions || []).map((qn) => QuestionSection(qn));
  return (
    <BeigeBackground>
      <NavBarWithBack />
      <BodyAfterNavBarWithPadding>
        <NameDiv>
          <NameTextHeader>{name}</NameTextHeader>
          <ShareButton onClick={onClickShareButton} />
        </NameDiv>
        <p>{description}</p>
        <p><Users /> {numAttempts} people attempted</p>
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </BeigeBackground>
  );
};

export default QuizCreateSummary;
