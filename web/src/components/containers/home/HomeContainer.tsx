import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUserAttemptedQuizzes, getUserCreatedQuizzes } from '../../../api';
import { IHomeContainerProps, IQuizLists } from '../../../interfaces/home';
import { IQuiz } from '../../../interfaces/home';
import { AppState } from '../../../store/store';
import { getUser } from '../../../utils/auth';
import Loading from '../../presentations/common/Loading';
import HomeContent from '../../presentations/home/HomeContent';
import Home from '../../presentations/home/index';
import { setLoadingComplete } from '../loading/redux/actions';
import { reset } from '../quiz-create/redux/actions';
import { setAttemptedQuizzes, setCreatedQuizzes, setOngoingQuizzes } from './redux/actions';
import { ATTEMPTED_QUIZZES_SELECTED, CREATED_QUIZZES_SELECTED, ONGOING_QUIZZES_SELECTED } from './redux/types';

class HomeContainer extends React.Component<IHomeContainerProps> {
  public async componentDidMount() {
    this.props.setLoadingComplete(false);

    const userId = getUser().id;

    const apiAttemptedQuizzes = await getUserAttemptedQuizzes(userId);

    if (apiAttemptedQuizzes.data) {
      let attemptedQuizzes = apiAttemptedQuizzes.data.filter((quiz: any) => quiz.is_finished);
      let ongoingQuizzes = apiAttemptedQuizzes.data.filter((quiz: any) => !quiz.is_finished);

      attemptedQuizzes = attemptedQuizzes ? attemptedQuizzes.map(packageQuizInfo) : [];
      ongoingQuizzes = ongoingQuizzes ? ongoingQuizzes.map(packageQuizInfo) : [];

      this.props.setAttemptedQuizzes(attemptedQuizzes);
      this.props.setOngoingQuizzes(ongoingQuizzes);
    }

    const apiCreatedQuizzes = await getUserCreatedQuizzes(userId);

    if (apiCreatedQuizzes.data) {
      const createdQuizzes = apiCreatedQuizzes.data.map((quiz: any) => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description || 'No description',
        numAttempted: quiz.num_attempts,
        dateCreated: quiz.created_at
      }));
      this.props.setCreatedQuizzes(createdQuizzes);
    }

    this.props.resetQuizCreate();

    this.props.setLoadingComplete(true);
  }

  public render() {
    const { createdQuizList, attemptedQuizList, ongoingQuizList, quizTypeSelected } = this.props;

    if (!this.props.hasLoaded) {
      return <Loading />;
    }

    return (
      <Home onLogout={onLogout}>
        <HomeContent
          quizList={quizListSelector(quizTypeSelected, {
            createdQuizList,
            attemptedQuizList,
            ongoingQuizList
          })}
          quizTypeSelected={quizTypeSelected}
        />
      </Home>
    );
  }
}

const quizListSelector = (quizType: string, quizLists: IQuizLists) => {
  switch (quizType) {
    case CREATED_QUIZZES_SELECTED:
      return quizLists.createdQuizList;
    case ATTEMPTED_QUIZZES_SELECTED:
      return quizLists.attemptedQuizList;
    case ONGOING_QUIZZES_SELECTED:
      return quizLists.ongoingQuizList;
    default:
      return [];
  }

};

const packageQuizInfo = (quiz: any) => ({
  id: quiz.id,
  title: quiz.title,
  description: quiz.description || 'No description',
  numAttempted: quiz.num_attempts,
  dateCreated: quiz.created_at
});

const onLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.reload();
};

const mapStateToProps = (state: AppState) => ({
  createdQuizList: state.home.createdQuizList,
  attemptedQuizList: state.home.attemptedQuizList,
  ongoingQuizList: state.home.ongoingQuizList,
  quizTypeSelected: state.home.quizTypeSelected,
  hasLoaded: state.loading.hasLoaded
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCreatedQuizzes: (questions: IQuiz[]) => {
      dispatch(setCreatedQuizzes(questions));
    },
    setAttemptedQuizzes: (questions: IQuiz[]) => {
      dispatch(setAttemptedQuizzes(questions));
    },
    setOngoingQuizzes: (questions: IQuiz[]) => {
      dispatch(setOngoingQuizzes(questions));
    },
    setLoadingComplete: (hasLoaded: boolean) =>
      dispatch(setLoadingComplete(hasLoaded)),
    resetQuizCreate: () => dispatch(reset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
