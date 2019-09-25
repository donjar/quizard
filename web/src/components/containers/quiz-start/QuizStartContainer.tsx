import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getQuizAttemptStatus, getQuizById } from '../../../api';
import { IQuiz } from '../../../interfaces/quiz-start';
import { AppState } from '../../../store/store';
import QuizStart from '../../presentations/quiz-start/index';
import QuizClosedContainer from '../quiz-closed/QuizClosedContainer';
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
  numQuestions: number;
  setQuiz: (quiz: IQuiz) => void;
  changeCurrQuestionIdx: (newQuestionIdx: number) => void;
}

class QuizStartContainer extends React.Component<IQuizStartContainerProps> {
  public async componentDidMount() {
    const { match: { params: { id: quizId = '' } = {} } = {} , ...props } = this.props;
    const quiz = (await getQuizById(quizId)).data;
    const attempt = (await getQuizAttemptStatus(quizId)).data;

    if (quiz === undefined) {
      // history.push('/');
    } else {
      const continueFrom = quiz.questions.indexOf(attempt.continue_from);
      props.setQuiz({
        quizId,
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
    };

    if (this.props.name === '') {
      return <QuizClosedContainer />;
    }

    if (this.props.isFinished || this.props.currQuestionIdx >= this.props.numQuestions) {
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
  quizId: state.quizStart.quizId,
  name: state.quizStart.name,
  description: state.quizStart.description,
  isFinished: state.quizStart.isFinished,
  continueFrom: state.quizStart.continueFrom,
  userQuizAnswers: state.quizStart.userQuizAnswers,
  currQuestionIdx: state.quizQuestion.currQuestionIdx,
  numQuestions: state.quizQuestion.questions.length,
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
