import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { IHomeContentProps } from '../../../interfaces/home/index';
import DarkButton from '../common/buttons/DarkButton';
import UnselectedButton from '../common/buttons/UnselectedButton';
import QuizCard from './QuizCard';

const StyledHomeContent = styled.div`
  & > * {
    margin: 5px 0;
  }
`;

const QuizTypeToolbar = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 11px;
  }
`;

const QuizList = styled.div`
  & > * {
    margin: 20px 0;
  }
`;

const QuizTypeButton: React.FC<IHomeContentProps> = ({
  isSelected,
  children
}) => {
  return isSelected ? (
    <DarkButton>{children}</DarkButton>
  ) : (
    <UnselectedButton>{children}</UnselectedButton>
  );
};

const quizArray: ReactElement[] = [];
for (let i = 0; i < 5; i++) {
  quizArray.push(
    <QuizCard
      key={i}
      title="Quiz Title"
      description="This quiz is about lorem ipsum dolor"
      numAttempted={50}
      dateCreated={2}
    />
  );
}

const HomeContent: React.FC = () => {
  return (
    <StyledHomeContent>
      <div>My Quizzes</div>
      <QuizTypeToolbar>
        <QuizTypeButton isSelected={1}>Created</QuizTypeButton>
        <QuizTypeButton isSelected={0}>Attempted</QuizTypeButton>
      </QuizTypeToolbar>
      <QuizList>{quizArray}</QuizList>
    </StyledHomeContent>
  );
};

export default HomeContent;
