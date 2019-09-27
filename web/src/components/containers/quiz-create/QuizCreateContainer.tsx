import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createQuiz } from '../../../api';
import { IQuestion } from '../../../interfaces/quiz-create';
import { AppState } from '../../../store/store';
import QuizCreate from '../../presentations/quiz-create/index';
import QuizCreateQuestionCard from '../../presentations/quiz-create/QuizCreateQuestionCard';
import {
  addAnswerOption,
  addQuestion,
  changeAnswerOption,
  changeDescription,
  changeName,
  changeQuestionText,
  deleteAnswerOption,
  deleteQuestion,
  quizCreated,
  setCorrectAnswer,
  setError
} from './redux/actions';

interface IQuizCreateContainerProps {
  questions: IQuestion[];
  name: string;
  description: string;
  createdQuizId?: string;
  error?: any;
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
  onChangeName: (newName: string) => void;
  onChangeDescription: (newDesc: string) => void;
  onChangeQuestionText: (questionIdx: number, newText: string) => void;
  setError: (error: any) => void;
  quizCreated: (quizId: string) => void;
}

const QuizCreateContainer: React.FC<IQuizCreateContainerProps> = ({
  questions,
  name,
  description,
  createdQuizId,
  error,
  onAddQuestion,
  onDeleteQuestion,
  onChangeAnswerOption,
  onAddAnswerOption,
  onDeleteAnswerOption,
  onSetCorrectAnswerOption,
  onChangeName,
  onChangeDescription,
  onChangeQuestionText,
  ...props
}) => {
  window.addEventListener('beforeunload', (e) => {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
  });

  // TODO: make map only call when questions object changes
  const questionCards = questions.map((question, questionIdx) => {
    const onEraseQuestion = () => {
      if (window.confirm(`Are you sure you want to delete question ${questionIdx + 1}?`)) {
        onDeleteQuestion(questionIdx);
      }
    };

    return (
      <QuizCreateQuestionCard
        key={questionIdx}
        questionNumber={questionIdx + 1}
        text={question.text}
        options={question.options}
        correctOption={question.correctOption}
        onEraseQuestion={onEraseQuestion}
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
        onChangeText={(newText) =>
          onChangeQuestionText(questionIdx, newText)
        }
        error={
        error &&
          error.questions &&
          error.questions[0] &&
          error.questions[0][questionIdx] &&
          error.questions[0][questionIdx][0]
        }
      />
    );
  });

  const onCreateQuiz = async () => {
    const resp = await createQuiz({
      title: name,
      description,
      questions: questions.map((question) => {
        return {
          text: question.text,
          options: question.options,
          correct_option: question.correctOption
        };
      })
    });

    if ('error' in resp) {
      props.setError(resp.error);
    } else {
      alert('Quiz created!');
      props.quizCreated(resp.data.id);
    }
  };

  return (
    <QuizCreate
      name={name}
      description={description}
      error={error}
      numQuestions={questions.length}
      createdQuizId={createdQuizId}
      onChangeName={onChangeName}
      onChangeDescription={onChangeDescription}
      onAddQuestion={onAddQuestion}
      onCreateQuiz={onCreateQuiz}
    >
      {questionCards}
    </QuizCreate>
  );
};

const mapStateToProps = (state: AppState) => ({
  name: state.quizCreate.name,
  description: state.quizCreate.description,
  questions: state.quizCreate.questions,
  createdQuizId: state.quizCreate.createdQuizId,
  error: state.quizCreate.error
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddQuestion: () => {
      const newQuestion = {
        correctOption: 0,
        options: ['', ''],
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
      dispatch(setCorrectAnswer({ questionIdx, optionIdx })),
    onChangeName: (newName: string) =>
      dispatch(changeName(newName)),
    onChangeDescription: (newDesc: string) =>
      dispatch(changeDescription(newDesc)),
    onChangeQuestionText: (questionIdx: number, newText: string) =>
      dispatch(changeQuestionText({ questionIdx, newText })),
    setError: (error: any) =>
      dispatch(setError(error)),
    quizCreated: (quizId: string) =>
      dispatch(quizCreated(quizId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreateContainer);
