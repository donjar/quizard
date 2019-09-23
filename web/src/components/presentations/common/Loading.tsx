import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { BeigeBackground } from './BeigeBackground';

const LoadingDiv = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledOwl = styled(Owl)`
  height: 15vh;
`;

const Loading: React.FC = () => {
  return (
    <BeigeBackground>
      <LoadingDiv>
        <StyledOwl />
        <ReactLoading
          type="bubbles"
          color="var(--red)"
        />
      </LoadingDiv>
    </BeigeBackground>
  );
};

export default Loading;
