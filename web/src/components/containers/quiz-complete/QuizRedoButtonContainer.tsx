import React from 'react';
import { connect } from 'react-redux';
import { redoQuiz } from '../../../api';
import { IQuizRedoButtonProps } from '../../../interfaces/quiz-complete';
import { AppState } from '../../../store/store';
import BigDarkButton from '../../presentations/common/buttons/BigDarkButton';

const QuizRedoButtonContainer: React.FC<IQuizRedoButtonProps> = ({ quizId }) => {
  return (
    <BigDarkButton onClick={() => handleRedoQuiz(quizId)}>
      Try Again
    </BigDarkButton>
  );
};

const handleRedoQuiz = async (quizId: string) => {
  await redoQuiz(quizId);

  window.location.replace(`${window.location.origin}/quiz/${quizId}`);
};

const mapStateToProps = (state: AppState, ownProps: any) => ({
  quizId: ownProps.quizId || state.quizStart.quizId
});

export default connect(mapStateToProps)(QuizRedoButtonContainer);
