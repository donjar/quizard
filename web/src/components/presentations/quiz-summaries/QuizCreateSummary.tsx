import React, { useState, useEffect } from 'react';

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

const QuizCreateSummary: React.FC<IQuizCreateSummaryProps> = ({
  name,
  description,
  numAttempts,
  questions,
  sharableLink,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

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
        <p><Users /> {numAttempts} people attempted</p>
        {questionCards}
      </BodyAfterNavBarWithPadding>
    </StyledBeigeBackground>
  );
};

export default QuizCreateSummary;
