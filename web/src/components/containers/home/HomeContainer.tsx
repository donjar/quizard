import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { getAllQuizzes } from '../../../api';
import { IHomeContainerProps } from '../../../interfaces/home';
import { IQuestion } from '../../../interfaces/home';
import { AppState } from '../../../store/store';
import { isLoggedIn } from '../../../utils/auth';
import HomeContent from '../../presentations/home/HomeContent';
import Home from '../../presentations/home/index';
import { setAttemptedQuizzes, setCreatedQuizzes } from './redux/actions';
import { CREATED_QUIZZES_SELECTED } from './redux/types';

class HomeContainer extends React.Component<IHomeContainerProps> {
  public async componentDidMount() {
    if (!isLoggedIn()) {
      return;
    }

    const apiQuizzes = await getAllQuizzes();
    const quizzes = apiQuizzes.data.map((quiz: any) => ({
      title: quiz.title,
      description: quiz.description || 'No description',
      numAttempted: quiz.num_attempts,
      dateCreated: quiz.created_at
    }));
    this.props.setAttemptedQuizzes(quizzes);
    this.props.setCreatedQuizzes(quizzes);
  }

  public render() {
    if (!isLoggedIn()) {
      return (
        <Redirect to="/" />
      );
    }

    const onLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.reload();
    };

    const { createdQuizList, attemptedQuizList, quizTypeSelected } = this.props;
    return (
      <Home onLogout={onLogout}>
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
  }
}

const mapStateToProps = (state: AppState) => ({
  createdQuizList: state.home.createdQuizList,
  attemptedQuizList: state.home.attemptedQuizList,
  quizTypeSelected: state.home.quizTypeSelected
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCreatedQuizzes: (questions: IQuestion[]) => {
      dispatch(setCreatedQuizzes(questions));
    },
    setAttemptedQuizzes: (questions: IQuestion[]) => {
      dispatch(setAttemptedQuizzes(questions));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
