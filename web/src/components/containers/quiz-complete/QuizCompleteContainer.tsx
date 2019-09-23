import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import QuizComplete from '../../presentations/quiz-complete/index';

const QuizCompleteContainer: React.FC = ({score, maxScore, quizName, props}: any) => {
  return <QuizComplete
    score={score}
    maxScore={maxScore}
    quizName={quizName}
    {...props}
  />;
};

const mapStateToProps = (state: AppState) => ({
  score: state.quizStart.score,
  maxScore: Object.keys(state.quizStart.userQuizAnswers).length,
  quizName: state.quizStart.name,
});

export default connect(mapStateToProps)(QuizCompleteContainer);
