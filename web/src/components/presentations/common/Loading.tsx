import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { BeigeBackground } from './BeigeBackground';

const LoadingDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    height: 15vh;
  }
`;

const Loading: React.FC = () => {
  return (
    <BeigeBackground>
      <LoadingDiv>
        <img src={'./owl.png'} alt={'Quizard logo'} />
        <ReactLoading
          type="bubbles"
          color="var(--red)"
        />
      </LoadingDiv>
    </BeigeBackground>
  );
};

export default Loading;
