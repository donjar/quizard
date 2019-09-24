import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import QuizComplete from '../../presentations/quiz-complete/index';
import { IQuizCompleteProps } from '../../../interfaces/quiz-complete';

const QuizCompleteContainer: React.FC<IQuizCompleteProps> = ({ score, maxScore, quizName }) => {
  return <QuizComplete
    score={score}
    maxScore={maxScore}
    quizName={quizName}
  />;
};

const mapStateToProps = (state: AppState) => ({
  score: state.quizStart.score,
  maxScore: Object.keys(state.quizStart.userQuizAnswers).length,
  quizName: state.quizStart.name,
});

export default connect(mapStateToProps)(QuizCompleteContainer);
