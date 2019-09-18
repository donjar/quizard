import React from 'react';

interface IProgressBarProps {
  now: number;
  total: number;
}

const QuizProgressBar: React.FC<IProgressBarProps> = ({now, total}) => {
  return <div>Progress: {now} out of {total}</div>;
};

export default QuizProgressBar;
