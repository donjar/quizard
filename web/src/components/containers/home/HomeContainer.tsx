import React from 'react';
import { connect } from 'react-redux';
import { IHomeContainerProps } from '../../../interfaces/home';
import { AppState } from '../../../store/store';
import HomeContent from '../../presentations/home/HomeContent';
import Home from '../../presentations/home/index';
import { CREATED_QUIZZES_SELECTED } from './redux/types';

const HomeContainer: React.FC<IHomeContainerProps> = ({
  createdQuizList,
  attemptedQuizList,
  quizTypeSelected
}) => {
  return (
    <Home>
      <HomeContent
        quizList={
          quizTypeSelected === CREATED_QUIZZES_SELECTED
            ? createdQuizList
            : attemptedQuizList
        }
        quizTypeSelected={quizTypeSelected}
      />
    </Home>
  );
};

const mapStateToProps = (state: AppState) => ({
  createdQuizList: state.home.createdQuizList,
  attemptedQuizList: state.home.attemptedQuizList,
  quizTypeSelected: state.home.quizTypeSelected
});

export default connect(mapStateToProps)(HomeContainer);
