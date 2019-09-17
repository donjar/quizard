import React from 'react';
import styled from 'styled-components';
import { HideOnMedium } from '../../../utils/media';
import { CreateQuizButton } from '../common/buttons/CreateQuizButton';

const StyledHomeHeader = styled.div`
  display: flex;

  & > * {
    flex: 1 1 0;
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

const StyledQuizardLogo = styled.div`
  max-width: 450px;
  max-height: 400px;

  & > img {
    width: 100%;
    height: 100%;
  }
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
          <div>
            <CreateQuizButton />
          </div>
        </StyledHomeWriteupBox>
        <HideOnMedium>
          <StyledQuizardLogo>
            <img src={'./owl.png'} alt={'Quizard logo'} />
          </StyledQuizardLogo>
        </HideOnMedium>
      </StyledHomeHeader>
    </>
  );
};

export default HomeHeader;
