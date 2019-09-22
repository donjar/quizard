import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getQuizById } from '../../../api';
import { IQuiz } from '../../../interfaces/quiz-start';
import { AppState } from '../../../store/store';
import QuizStart from '../../presentations/quiz-start/index';
import { setQuiz } from './redux/actions';

interface IQuizStartContainerProps {
  match: any;
  name: string;
  description: string;
  setQuiz: (quiz: IQuiz) => void;
}

class QuizStartContainer extends React.Component<IQuizStartContainerProps> {
  public async componentDidMount() {
    const { match: { params: { id: quizId = '' } = {} } = {} , ...props } = this.props;
    const quiz = (await getQuizById(quizId)).data;
    props.setQuiz({
      name: quiz.title,
      description: quiz.description || 'No description',
    });
  }

  public render() {
    const quiz = {
      name: this.props.name,
      description: this.props.description
    };
    return (
      <QuizStart
        quiz={quiz}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  name: state.quizStart.name,
  description: state.quizStart.description
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setQuiz: (quiz: IQuiz) => {
      dispatch(setQuiz(quiz));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizStartContainer);
