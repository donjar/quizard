import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getQuizById } from '../../../api';
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

const QuizCreateContainer: React.FC<IQuizCreateContainerProps> = ({
  quizId,
  name,
  description,
  numAttempts,
  questions,
  ...props
}) => {
  getQuizById(quizId)
    .then((apiResult) => {
      props.setQuiz({
        name: apiResult.data.title,
        description: 'Description', // apiResult.description,
        numAttempts: 3, // apiResult.num_attempts,
        questions: apiResult.data.questions,
      });
    });

  return (
    <QuizCreateSummary
      name={name}
      description={description}
      numAttempts={numAttempts}
      questions={questions}
    />
  );
};

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
