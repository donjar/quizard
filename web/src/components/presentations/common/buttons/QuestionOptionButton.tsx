import styled from 'styled-components';
import RoundedButton from './RoundedButton';

export const QuestionOptionButton = styled(RoundedButton)`
  background: none;
  border: 2px solid var(--dark-blue);
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 20px;
  text-align: left;
  overflow-wrap: break-word;
  font-size: 1rem;
`;

export const CorrectQuestionOptionButton = styled(QuestionOptionButton)`
  color: white;
  border-color: transparent;
  background: var(--green);
  box-shadow: 0px 0px 10px var(--green);
`;

export const IncorrectQuestionOptionButton = styled(QuestionOptionButton)`
  color: white;
  border-color: transparent;
  background: var(--red);
  box-shadow: 0px 0px 10px var(--red);
`;
