import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IRowRendererProps } from '../../../interfaces/home';
import { IHomeContentProps, IQuizCard } from '../../../interfaces/home/index';
import QuizTypeButtonContainer from '../../containers/home/QuizTypeButtonContainer';
import {
  ATTEMPTED_QUIZZES_SELECTED,
  CREATED_QUIZZES_SELECTED
} from '../../containers/home/redux/types';
import { HorizButtonToolbar } from '../common/HorizButtonToolbar';
import { VirtualizedList } from '../common/VirtualizedList';
import QuizCard from './QuizCard';

const StyledHomeContent = styled.div`
  & > * {
    margin: 5px 0;
  }
`;

const createQuizCardList = (
  quizList: IQuizCard[],
  quizType: string
) => {
  let path = '';
  switch (quizType) {
    case CREATED_QUIZZES_SELECTED:
      path = '/quiz-create-summary';
      break;
    case ATTEMPTED_QUIZZES_SELECTED:
      path = '/quiz-review';
      break;
  }

  return quizList.map((quiz, index) => {
    return (
      <Link to={`${path}/${quiz.id}`}>
        <QuizCard key={index} {...quiz} />
      </Link>
    );
  });
};

const createQuizCardRowRenderer = (
  quizList: IQuizCard[],
  quizType: string
) => {
  const quizCardList = createQuizCardList(quizList, quizType);

  return ({ key, index, style }: IRowRendererProps) => {
    return (
      <div key={key} style={style}>
        {quizCardList[index]}
      </div>
    );
  };
};

const isCreatedButtonSelected = (buttonType: string) => {
  return buttonType === CREATED_QUIZZES_SELECTED;
};

const isAttemptedButtonSelected = (buttonType: string) => {
  return buttonType === ATTEMPTED_QUIZZES_SELECTED;
};

const HomeContent: React.FC<IHomeContentProps> = ({
  quizTypeSelected,
  quizList
}) => {
  return (
    <StyledHomeContent>
      <div>My Quizzes</div>
      <HorizButtonToolbar>
        <QuizTypeButtonContainer
          quizTypeSelected={CREATED_QUIZZES_SELECTED}
          isSelected={isCreatedButtonSelected(quizTypeSelected)}
        >
          Created
        </QuizTypeButtonContainer>
        <QuizTypeButtonContainer
          quizTypeSelected={ATTEMPTED_QUIZZES_SELECTED}
          isSelected={isAttemptedButtonSelected(quizTypeSelected)}
        >
          Attempted
        </QuizTypeButtonContainer>
      </HorizButtonToolbar>
      <VirtualizedList
        listHeight={400}
        rowCount={quizList.length}
        rowHeight={200}
        rowRenderer={createQuizCardRowRenderer(
          quizList,
          quizTypeSelected
        )}
      />
    </StyledHomeContent>
  );
};

export default HomeContent;
