import React from 'react';
import styled from 'styled-components';
import { IQuizCreateQuestionCardProps } from '../../../interfaces/quiz-create';
import { AnswerButton, SelectedAnswerButton } from '../common/buttons/AnswerButton';
import DarkButton from '../common/buttons/DarkButton';
import DeleteButton from '../common/buttons/DeleteButton';
import Card from '../common/Card';
import withError from '../common/WithError';

const StyledQuestionCard = styled(Card)`
  position:relative;
  padding: 1em;
  margin: 1em 0;
`;

const QuestionTextArea = withError(styled.textarea`
  font-size: 1rem;
  padding: 15px;
  width: calc(100% - 30px);
  background: var(--pale-grey);

  border: none;
  border-radius: 15px;

  resize: none;
`);

const OptionInputRow = withError(styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  margin: 10px 0;
  background: none;

  border: 1px solid var(--dark-blue);
  border-radius: 15px;
`);

const OptionInputDiv = styled.div`
  flex: 1;
`;

const OptionInput = styled.input`
  font-size: 1rem;
  font-weight: lighter;

  padding: 15px;
  width: calc(100% - 30px);
  background: none;

  border: transparent;
`;

const DeleteQuestionButtonDiv = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const QuizCreateQuestionCard: React.FC<IQuizCreateQuestionCardProps> = ({
  questionNumber,
  text,
  options,
  correctOption,
  onEraseQuestion,
  onChangeOption,
  onNewOption,
  onEraseOption,
  onSetCorrectAnswer,
  onChangeText,
  error
}) => {
  const optionsArray = options.map((option, idx) => {
    let OptionButton;
    if (idx === correctOption) {
      OptionButton = SelectedAnswerButton;
    } else {
      OptionButton = AnswerButton;
    }

    const err = (
      error &&
      error.options &&
      error.options[0] &&
      error.options[0][idx] &&
      error.options[0][idx].join('; ')
    );

    return (
      <>
        <OptionInputRow key={idx} error={err}>
          <OptionInputDiv>
            <OptionInput
              type="text"
              placeholder="Answer option"
              value={option}
              onChange={(e) => onChangeOption(idx, e.target.value)}
              width={`calc(100% - 30px)`}
              required
            />
          </OptionInputDiv>
          <OptionButton onClick={() => onSetCorrectAnswer(idx)} />
          <DeleteButton onClick={() => onEraseOption(idx)} />
        </OptionInputRow>
      </>
    );
  });

  return (
    <StyledQuestionCard>
      <DeleteQuestionButtonDiv>
        <DeleteButton onClick={onEraseQuestion} />
      </DeleteQuestionButtonDiv>
      <h3>Question {questionNumber}</h3>
      <QuestionTextArea
        placeholder="Question"
        value={text}
        rows={4}
        onChange={(e: any) => onChangeText(e.target.value)}
        error={error && error.text && error.text.join('; ')}
      />

      <h5>Options:</h5>
      {optionsArray}
      <DarkButton onClick={onNewOption}>+ Add Option</DarkButton>
    </StyledQuestionCard>
  );
};

export default QuizCreateQuestionCard;
