import React from 'react';
import styled from 'styled-components';
import ProgressBar from '../common/ProgressBar';

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 2em;
  padding 5px;
`;

const ProgressText = styled.div`
  margin: 5px 20px 0 5px;
  text-align: right;
  font-size: 0.8rem;
`;

interface IProgressBarProps {
  now: number;
  total: number;
}

const QuizProgressBar: React.FC<IProgressBarProps> = ({now, total}) => {
  return (
    <ProgressContainer>
      <ProgressBar
        progress={now / total}
        backgroundColor={`white`}
        fillerColor={`var(--dark-blue)`}
      />
      <ProgressText>{now} out of {total}</ProgressText>
    </ProgressContainer>
  );
};

export default QuizProgressBar;
