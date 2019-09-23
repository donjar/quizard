import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUserAttemptedQuizzes, getUserCreatedQuizzes } from '../../../api';
import { IHomeContainerProps } from '../../../interfaces/home';
import { IQuiz } from '../../../interfaces/home';
import { AppState } from '../../../store/store';
import { getUser } from '../../../utils/auth';
import HomeContent from '../../presentations/home/HomeContent';
import Home from '../../presentations/home/index';
import { setAttemptedQuizzes, setCreatedQuizzes } from './redux/actions';
import { CREATED_QUIZZES_SELECTED } from './redux/types';

class HomeContainer extends React.Component<IHomeContainerProps> {
  public async componentDidMount() {
    const userId = getUser().id;

    const apiAttemptedQuizzes = await getUserAttemptedQuizzes(userId);
    const attemptedQuizzes = apiAttemptedQuizzes.data.attempted.map((quiz: any) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description || 'No description',
      numAttempted: quiz.num_attempts,
      dateCreated: quiz.created_at
    }));
    this.props.setAttemptedQuizzes(attemptedQuizzes);

    const apiCreatedQuizzes = await getUserCreatedQuizzes(userId);
    const createdQuizzes = apiCreatedQuizzes.data.created.map((quiz: any) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description || 'No description',
      numAttempted: quiz.num_attempts,
      dateCreated: quiz.created_at
    }));
    this.props.setCreatedQuizzes(createdQuizzes);
  }

  public render() {
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

const onLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.reload();
};

const mapStateToProps = (state: AppState) => ({
  createdQuizList: state.home.createdQuizList,
  attemptedQuizList: state.home.attemptedQuizList,
  quizTypeSelected: state.home.quizTypeSelected
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCreatedQuizzes: (questions: IQuiz[]) => {
      dispatch(setCreatedQuizzes(questions));
    },
    setAttemptedQuizzes: (questions: IQuiz[]) => {
      dispatch(setAttemptedQuizzes(questions));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
