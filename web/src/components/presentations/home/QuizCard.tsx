import React from 'react';
import styled from 'styled-components';
import { ReactComponent as People } from '../../../svg/people.svg';
import { ReactComponent as BackBtn } from '../../../svg/btn-back.svg';
import { QuizDateCreatedDiv } from './QuizDateCreatedDiv';
import { QuizCardContents } from './QuizCardContents';

const StyledQuizCard = styled.div`
  position: relative;
  max-width: 1065px;
  max-height: 206px;

  padding: 20px;

  background: #ffffff;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(56, 57, 88, 0.25);
`;

const QuizTitle = styled.div`
  font-size: 32px;
`;

const QuizDescription = styled.div`
  font-weight: 300;
`;

const MiscDetails = styled.div`
  font-weight: 300;
  font-size: 18px;
  margin-top: 15px;
`;

type QuizCardProps = {
  title: string;
  description: string;
  numAttempted: number;
  dateCreated: number;
};

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  numAttempted,
  dateCreated,
  children
}) => {
  return (
    <StyledQuizCard>
      <QuizDateCreatedDiv> Created {dateCreated} days ago</QuizDateCreatedDiv>
      <QuizCardContents>
        <div>
          <QuizTitle>{title}</QuizTitle>
          <QuizDescription>{description}</QuizDescription>
          <MiscDetails>
            <People /> {numAttempted} people attended
          </MiscDetails>
          {children}
        </div>
        <div>
          <BackBtn />
        </div>
      </QuizCardContents>
    </StyledQuizCard>
  );
};

export default QuizCard;
