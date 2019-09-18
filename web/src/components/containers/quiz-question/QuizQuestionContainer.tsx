import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IQuestion } from '../../../interfaces/quiz-question';
import { AppState } from '../../../store/store';
import QuizQuestion from '../../presentations/quiz-question/index';
import { selectOption } from './redux/action';

interface IQuizQuestionContainerProps {
  question: IQuestion;
  numQuestions: number;
  questionNumber: number;
  onSelectOption: (questionIdx: number, optionIdx: number) => void;
}

const QuizQuestionContainer: React.FC<IQuizQuestionContainerProps> = ({
  question,
  numQuestions,
  questionNumber,
  onSelectOption
}) => {
  const handleSelectedOption = (optionIdx: number) => {
    // TODO: Implement
    // tslint:disable-next-line:no-console
    console.log(`${optionIdx} CHOSEN`);
    onSelectOption(questionNumber, optionIdx);
  };

  const handleLeaveQuiz = () => {
    // TODO: Implement
    // tslint:disable-next-line:no-console
    console.log('LEAVE');
  };

  console.log(`${question}, ${numQuestions}, ${questionNumber}`);

  return (
    <QuizQuestion
      questionNumber={questionNumber}
      numQuestions={numQuestions}
      question={question.text}
      options={question.options}
      onSelectOption={handleSelectedOption}
      onCloseQuiz={handleLeaveQuiz}
    />
  );
};

const mapStateToProps = (state: AppState) => {
  const { questions, currQuestionIdx } = state.quizQuestion;
  return {
    numQuestions: questions.length,
    questionNumber: currQuestionIdx + 1,
    question: questions[currQuestionIdx]
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSelectOption: (questionIdx: number, optionIdx: number) =>
      dispatch(selectOption({ questionIdx, optionIdx }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizQuestionContainer);
