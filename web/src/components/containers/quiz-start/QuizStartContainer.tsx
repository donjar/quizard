import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { getQuizAttemptStatus, getQuizById } from '../../../api';
import { IQuiz } from '../../../interfaces/quiz-start';
import { AppState } from '../../../store/store';
import { history } from '../../../utils/history';
import QuizStart from '../../presentations/quiz-start/index';
import QuizCompleteContainer from '../quiz-complete/QuizCompleteContainer';
import QuizQuestionContainer from '../quiz-question/QuizQuestionContainer';
import { startQuiz } from '../quiz-question/redux/action';
import { setQuiz } from './redux/actions';

interface IQuizStartContainerProps {
  match: any;
  name: string;
  description: string;
  isFinished: boolean;
  continueFrom: number;
  userQuizAnswers: {};
  currQuestionIdx: number;
  setQuiz: (quiz: IQuiz) => void;
  changeCurrQuestionIdx: (newQuestionIdx: number) => void;
}

class QuizStartContainer extends React.Component<IQuizStartContainerProps> {
  public async componentDidMount() {
    const { match: { params: { id: quizId = '' } = {} } = {} , ...props } = this.props;
    const quiz = (await getQuizById(quizId)).data;
    const attempt = (await getQuizAttemptStatus(quizId)).data;

    if (quiz === undefined) {
      history.push('/');
    } else {
      const continueFrom = quiz.questions.indexOf(attempt.continue_from);
      props.setQuiz({
        name: quiz.title,
        description: quiz.description || 'No description',
        isFinished: attempt.is_finished,
        continueFrom,
        userQuizAnswers: attempt.answers,
        score: attempt.score
      });
    }
  }

  public render() {
    const quiz = {
      name: this.props.name,
      description: this.props.description,
      isFinished: false,
      continueFrom: -1,
      userQuizAnswers: {}
      score: undefined
    };

    if (this.props.isFinished) {
      // return <Redirect to={`/quiz-complete/${this.props.match.params.id}`} />;
      return <QuizCompleteContainer {...this.props} />;
    } else if (this.props.currQuestionIdx < 0) {
      return (
        <QuizStart
          quiz={quiz}
          isNewQuiz={Object.keys(this.props.userQuizAnswers).length < 1}
          onStartClick={() => this.props.changeCurrQuestionIdx(this.props.continueFrom)}
        />
      );
    } else {
      return <QuizQuestionContainer {...this.props} />;
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  name: state.quizStart.name,
  description: state.quizStart.description,
  isFinished: state.quizStart.isFinished,
  continueFrom: state.quizStart.continueFrom,
  userQuizAnswers: state.quizStart.userQuizAnswers,
  currQuestionIdx: state.quizQuestion.currQuestionIdx,
  score: state.quizStart.score
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setQuiz: (quiz: IQuiz) => {
      dispatch(setQuiz(quiz));
    },
    changeCurrQuestionIdx: (newQuestionIdx: number) =>
      dispatch(startQuiz(newQuestionIdx))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizStartContainer);
