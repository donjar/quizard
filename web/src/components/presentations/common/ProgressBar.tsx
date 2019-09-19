import React from 'react';
import styled from 'styled-components';

const defaultFillerColor = `var(--dark-blue)`;
const defaultBgColor = `none`;

interface IBarContainerProps {
  background?: string;
}

interface IFillerProps {
  progress: number;
  background?: string;
}

interface IProgressBarProps {
  progress: number;
  backgroundColor?: string;
  fillerColor?: string;
}

const ProgressBarContainer = styled.div`
  display: flex;
  height: 30px;
  width: 100%;
  border-radius: 50px;
  background: ${({ background }: IBarContainerProps) => (background || defaultBgColor)};
`;

const Filler = styled.div`
  border-radius: inherit;
  width: ${({ progress }: IFillerProps) => (`${progress * 100}%`)};
  background: ${({ background }: IFillerProps) => (background || defaultFillerColor)};
`;

const ProgressBar: React.FC<IProgressBarProps> = ({
  progress,
  backgroundColor,
  fillerColor
}) => {
  return (
    <ProgressBarContainer background={backgroundColor}>
      <Filler progress={progress} background={fillerColor} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
