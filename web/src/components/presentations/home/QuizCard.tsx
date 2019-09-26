import React from 'react';
import { ChevronRight, Users } from 'react-feather';
import styled from 'styled-components';
import { IQuizCard } from '../../../interfaces/home/index';
import Card from '../common/Card';
import { QuizCardContents } from './QuizCardContents';
import { QuizDateCreatedDiv } from './QuizDateCreatedDiv';

const StyledQuizCard = styled(Card)`
  margin: 0.5em 0;
  padding: 1em;
  width: calc(100% - 3em);
`;

const QuizTitle = styled.h2`
  font-weight: normal;
  margin: 0.8rem 0;
`;

const QuizDescription = styled.div`
  font-weight: lighter;
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
  height: 1rem;
`;

const QuizCard: React.FC<IQuizCard> = ({
  title,
  description,
  numAttempted,
  dateCreated
}) => {
  const daysAgo = Math.floor((Date.now() - (dateCreated * 1000)) / (1000 * 60 * 60 * 24));
  return (
    <StyledQuizCard>
      <QuizDateCreatedDiv>Created {daysAgo} days ago</QuizDateCreatedDiv>
      <QuizCardContents>
        <div>
          <QuizTitle>{title}</QuizTitle>
          <QuizDescription>{description}</QuizDescription>
          <MiscDetails>
            <UsersIcon /> {numAttempted} people attempted
          </MiscDetails>
        </div>
        <div>
          <ChevronRight />
        </div>
      </QuizCardContents>
    </StyledQuizCard>
  );
};

export default QuizCard;
