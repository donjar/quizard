import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getLatestQuizAttempt, getQuestionsByQuizId, getQuizById } from '../../../api';
import { IAttemptedQuestion, IAttemptedQuiz } from '../../../interfaces/quiz-create-summary';
import { AppState } from '../../../store/store';
import { history } from '../../../utils/history';
import QuizAttemptReview from '../../presentations/quiz-summaries/QuizAttemptReview';
import { setQuiz } from './redux/actions';

interface IQuizAttemptReviewContainerProps {
  match: any;
  name: string;
  description: string;
  score: number;
  questions: IAttemptedQuestion[];
  setQuiz: (quiz: IAttemptedQuiz) => void;
}

class QuizAttemptReviewContainer extends React.Component<IQuizAttemptReviewContainerProps> {
  public async componentDidMount() {
    const { match: { params: { id: quizId = '' } = {} } = {} , ...props } = this.props;
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
  }

  public render() {
    const { name, description, score, questions } = this.props;
    return (
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
  return state.quizAttemptReview;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setQuiz: (quiz: IAttemptedQuiz) => {
      dispatch(setQuiz(quiz));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizAttemptReviewContainer);
