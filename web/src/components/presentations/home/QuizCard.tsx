import React from 'react';
import styled from 'styled-components';
import { ReactComponent as People } from '../../../svg/people.svg';
import { ReactComponent as BackBtn } from '../../../svg/btn-back.svg';

const StyledQuizCard = styled.div`
  position: relative;
  max-width: 1065px;
  max-height: 206px;

  padding: 20px;

  background: #ffffff;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(56, 57, 88, 0.25);
`;

const QuizCardContents = styled.div`
  margin: 2% 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const DateCreatedDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;

  font-weight: 300;
  font-size: 18px;
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
      <DateCreatedDiv> Created {dateCreated} days ago</DateCreatedDiv>
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
