import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getQuestionsByQuizId, getQuizById } from '../../../api';
import { IQuiz } from '../../../interfaces/quiz-create-summary';
import { IQuizCreateSummaryContainerProps } from '../../../interfaces/quiz-create-summary';
import { AppState } from '../../../store/store';
import { history } from '../../../utils/history';
import QuizCreateSummary from '../../presentations/quiz-summaries/QuizCreateSummary';
import { setQuizCreateSummary } from './redux/actions';

class QuizCreateSummaryContainer extends React.Component<IQuizCreateSummaryContainerProps> {
  public async componentDidMount() {
    const { match: { params: { id: quizId = '' } = {} } = {} , ...props } = this.props;
    const quiz = (await getQuizById(quizId)).data;
    const questions = (await getQuestionsByQuizId(quizId)).data;

    if (quiz === undefined) {
      history.push('/');
    } else {
      props.setQuiz({
        name: quiz.title,
        description: quiz.description || 'No description',
        numAttempts: quiz.num_attempts,
        questions: questions.map((qn: any, idx: any) => {
          return {
            questionNumber: idx + 1,
            text: qn.text,
            options: qn.options,
            correctOption: 0
          };
        })
      });
    }
  }

  public render() {
    const { name, description, numAttempts, questions } = this.props;
    return (
      <QuizCreateSummary
        name={name}
        description={description}
        numAttempts={numAttempts}
        questions={questions}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  name: state.quizCreateSummary.name,
  description: state.quizCreateSummary.description,
  numAttempts: state.quizCreateSummary.numAttempts,
  questions: state.quizCreateSummary.questions,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setQuiz: (quiz: IQuiz) => {
      dispatch(setQuizCreateSummary(quiz));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreateSummaryContainer);
