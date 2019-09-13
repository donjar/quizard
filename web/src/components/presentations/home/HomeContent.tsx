import React, { ReactElement } from 'react';
import styled from 'styled-components';
import DarkButton from '../common/buttons/DarkButton';
import UnselectedButton from '../common/buttons/UnselectedButton';
import QuizCard from './QuizCard';

const StyledHomeContent = styled.div`
  * {
    margin: 5px 0;
  }
`;

const QuizTypeToolbar = styled.div`
  display: flex;

  *:not(:first-child) {
    margin-left: 11px;
  }
`;

const QuizList = styled.div`
  * {
    margin: 20px 0;
  }
`;

type Props = {
  isSelected: number;
};

const QuizTypeButton: React.FC<Props> = ({ isSelected, children }) => {
  return isSelected ? (
    <DarkButton>{children}</DarkButton>
  ) : (
    <UnselectedButton>{children}</UnselectedButton>
  );
};

let quizArray: ReactElement[] = [];
for (let i = 0; i < 5; i++) {
  quizArray.push(<QuizCard>Quiz Card</QuizCard>);
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
