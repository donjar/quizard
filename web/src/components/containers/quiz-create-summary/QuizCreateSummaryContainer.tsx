import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getQuestionsByQuizId, getQuizById } from '../../../api';
import { IQuestion, IQuiz } from '../../../interfaces/quiz-create-summary';
import { AppState } from '../../../store/store';
import QuizCreateSummary from '../../presentations/quiz-create-summary/index';
import { setQuiz } from './redux/actions';

interface IQuizCreateContainerProps {
  quizId: string;
  name: string;
  description: string;
  numAttempts: number;
  questions: IQuestion[];
  setQuiz: (quiz: IQuiz) => void;
}

class QuizCreateContainer extends React.Component<IQuizCreateContainerProps> {
  public componentDidMount() {
    const { quizId, ...props } = this.props;
    Promise.all([getQuizById(quizId), getQuestionsByQuizId(quizId)])
      .then((apiResults) => {
        const quiz = apiResults[0].data;
        const questions = apiResults[1].data;
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
      });
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
      dispatch(setQuiz(quiz));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreateContainer);
