import React from 'react';
import styled from 'styled-components';
import BigDarkButton from '../common/buttons/BigDarkButton';

const StyledHomeHeader = styled.div`
  display: flex;

  & > * {
    flex: 1 1 auto;
  }
`;

const StyledHomeWriteupBox = styled.div`
  & > * {
    margin: 20px 0;
  }
`;

const StyledHomeWriteupTitle = styled.div`
  font-size: 46px;
`;

const StyledHomeWriteup = styled.div`
  font-weight: 300;
`;

const HomeHeader: React.FC = () => {
  return (
    <>
      <StyledHomeHeader>
        <StyledHomeWriteupBox>
          <StyledHomeWriteupTitle>Create Quizzes</StyledHomeWriteupTitle>
          <StyledHomeWriteup>
            Easily create new quizzes with Quizard and share them with your
            students and peers!
          </StyledHomeWriteup>
          <BigDarkButton>Create New Quiz</BigDarkButton>
        </StyledHomeWriteupBox>
        <div>
          <img src={'./owl.png'} style={{ width: '450px', height: '400px' }} />
        </div>
      </StyledHomeHeader>
    </>
  );
};

export default HomeHeader;
