import React, { useState } from 'react';

import { Users } from 'react-feather';
import styled from 'styled-components';
import { IQuizCreateSummaryProps } from '../../../interfaces/quiz-create-summary/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import ShareButton from '../common/buttons/ShareButton';
import { NavBarWithBack } from '../common/NavBarWithBack';
import QuestionSection from './QuestionSection';
import ShareQuizModal from './ShareQuizModal';

const StyledBeigeBackground = styled(BeigeBackground)`
  width: 100%;
`;

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

const MiscDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  font-weight: 300;
  font-size: 1rem;
  margin-top: 15px;
`;

const UsersIcon = styled(Users)`
  height: 1.1rem;
`;

const QuizCreateSummary: React.FC<IQuizCreateSummaryProps> = ({
  name,
  description,
  numAttempts,
  questions,
  sharableLink,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questionCards = (questions || []).map((qn) => QuestionSection(qn));
  return (
    <StyledBeigeBackground>
      <NavBarWithBack />
      <ShareQuizModal
        isVisible={isModalOpen}
        sharableLink={sharableLink}
        onClose={() => setIsModalOpen(false)}
      />

      <BodyAfterNavBarWithPadding>
        <NameDiv>
          <NameTextHeader>{name}</NameTextHeader>
          <ShareButton onClick={() => setIsModalOpen(true)} />
        </NameDiv>
        <p>{description}</p>
        <MiscDetails><UsersIcon /> {numAttempts} people attempted</MiscDetails>
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </StyledBeigeBackground>
  );
};

export default QuizCreateSummary;
