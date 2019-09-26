import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getLatestQuizAttempt, getQuestionsByQuizId, getQuizById } from '../../../api';
import { IAttemptedQuestion, IAttemptedQuiz } from '../../../interfaces/quiz-create-summary';
import { AppState } from '../../../store/store';
import { history } from '../../../utils/history';
import Loading from '../../presentations/common/Loading';
import QuizAttemptReview from '../../presentations/quiz-summaries/QuizAttemptReview';
import { setLoadingComplete } from '../loading/redux/actions';
import { setQuiz } from './redux/actions';

interface IQuizAttemptReviewContainerProps {
  match: any;
  name: string;
  description: string;
  score: number;
  questions: IAttemptedQuestion[];
  hasLoaded: boolean;
  setQuiz: (quiz: IAttemptedQuiz) => void;
  setLoadingComplete: (hasLoaded: boolean) => void;
}

class QuizAttemptReviewContainer extends React.Component<IQuizAttemptReviewContainerProps> {
  public async componentDidMount() {
    const { match: { params: { id: quizId = '' } = {} } = {}, ...props } = this.props;

    this.props.setLoadingComplete(false);

    const quiz = (await getQuizById(quizId)).data;
    const questions = (await getQuestionsByQuizId(quizId)).data;
    const attempt = (await getLatestQuizAttempt(quizId)).data;

    if (quiz === undefined || !attempt.is_finished) {
      history.push('/');
    } else {
      props.setQuiz({
        name: quiz.title,
        description: quiz.description || 'No description',
        score: attempt.score,
        questions: questions.map((qn: any, idx: any) => {
          return {
            questionNumber: idx + 1,
            text: qn.text,
            options: qn.options,
            correctOption: 0,
            selectedOption: attempt.answers[qn.id],
          };
        })
      });
    }

    this.props.setLoadingComplete(true);
  }

  public render() {
    const { name, description, score, questions, hasLoaded } = this.props;

    return (!hasLoaded) ? <Loading /> : (
      <QuizAttemptReview
        name={name}
        description={description}
        score={score}
        questions={questions}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    ...state.quizAttemptReview,
    hasLoaded: state.loading.hasLoaded
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setQuiz: (quiz: IAttemptedQuiz) => {
      dispatch(setQuiz(quiz));
    },
    setLoadingComplete: (hasLoaded: boolean) =>
      dispatch(setLoadingComplete(hasLoaded))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizAttemptReviewContainer);
