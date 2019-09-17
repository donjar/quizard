import React from 'react';
import { connect } from 'react-redux';
import { IQuiz, IQuizStartProps } from '../../../interfaces/quiz-start';
import { AppState } from '../../../store/store';
import QuizStart from '../../presentations/quiz-start/index';

const QuizStartContainer: React.FC<IQuizStartProps> = (props) => {
  return <QuizStart quiz={props.quiz} />;
};

// temp prop
const tempQuiz: IQuiz = {
  description: 'Quiz description something or rather',
  dueDate: 124567,
  name: 'Quiz Name Here',
  type: 1
};

const mapStateToProps = (state: AppState) => ({
  home: state.home,
  quiz: tempQuiz
});

export default connect(mapStateToProps)(QuizStartContainer);
