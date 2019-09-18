import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { IQuestion, IQuizCreateProps } from '../../../interfaces/quiz-create';
import { AppState } from '../../../store/store';
import QuizCreate from '../../presentations/quiz-create/index';
import QuizCreateQuestionCard from '../../presentations/quiz-create/QuizCreateQuestionCard';
import {
  addAnswerOption,
  addQuestion,
  changeAnswerOption,
  deleteAnswerOption,
  deleteQuestion,
  setCorrectAnswer
} from './redux/actions';

interface IQuizCreateContainerProps {
  questions: IQuestion[];
  numQuestions: number;
  onAddQuestion: () => void;
  onDeleteQuestion: (questionIdx: number) => void;
  onChangeAnswerOption: (
    questionIdx: number,
    optionIdx: number,
    newOption: string
  ) => void;
  onAddAnswerOption: (questionIdx: number) => void;
  onDeleteAnswerOption: (questionIdx: number, optionIdx: number) => void;
  onSetCorrectAnswerOption: (questionIdx: number, optionIdx: number) => void;
}

const QuizCreateContainer: React.FC<IQuizCreateContainerProps> = ({
  questions,
  numQuestions,
  onAddQuestion,
  onDeleteQuestion,
  onChangeAnswerOption,
  onAddAnswerOption,
  onDeleteAnswerOption,
  onSetCorrectAnswerOption
}) => {
  // TODO: make map only call when questions object changes
  const questionCards = questions.map((question, questionIdx) => (
    <QuizCreateQuestionCard
      key={questionIdx}
      questionNumber={questionIdx + 1}
      text={question.text}
      options={question.options}
      correctOption={question.correctOption}
      onEraseQuestion={() => onDeleteQuestion(questionIdx)}
      onChangeOption={(optionIdx, newOption) =>
        onChangeAnswerOption(questionIdx, optionIdx, newOption)
      }
      onNewOption={() => onAddAnswerOption(questionIdx)}
      onEraseOption={(optionIdx) =>
        onDeleteAnswerOption(questionIdx, optionIdx)
      }
      onSetCorrectAnswer={(optionIdx) =>
        onSetCorrectAnswerOption(questionIdx, optionIdx)
      }
    />
  ));

  return (
    <QuizCreate numQuestions={numQuestions} onAddQuestion={onAddQuestion}>
      {questionCards}
    </QuizCreate>
  );
};

const mapStateToProps = (state: AppState) => ({
  numQuestions: state.quizCreate.questions.length,
  questions: state.quizCreate.questions
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddQuestion: () => {
      const newQuestion = {
        correctOption: 0,
        options: [''],
        text: ''
      };
      dispatch(addQuestion(newQuestion));
    },
    onDeleteQuestion: (questionIdx: number) => {
      dispatch(deleteQuestion(questionIdx));
    },
    onChangeAnswerOption: (
      questionIdx: number,
      optionIdx: number,
      newOption: string
    ) =>
      dispatch(
        changeAnswerOption({
          questionIdx,
          optionIdx,
          newAnswerOption: newOption
        })
      ),
    onAddAnswerOption: (questionIdx: number) =>
      dispatch(addAnswerOption(questionIdx)),
    onDeleteAnswerOption: (questionIdx: number, optionIdx: number) =>
      dispatch(deleteAnswerOption({ questionIdx, optionIdx })),
    onSetCorrectAnswerOption: (questionIdx: number, optionIdx: number) =>
      dispatch(setCorrectAnswer({ questionIdx, optionIdx }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreateContainer);
