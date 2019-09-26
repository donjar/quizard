import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { HideOnSmall } from '../../../utils/media';
import { CreateQuizButton } from '../common/buttons/CreateQuizButton';

const StyledHomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledHomeWriteupBox = styled.div`
  flex: 1;

  & > * {
    margin: 20px 0;
  }
`;

const StyledHomeWriteupTitle = styled.h1`
  font-size: 42px;
`;

const StyledHomeWriteup = styled.div`
  font-weight: 300;
`;

const StyledOwl = styled(Owl)`
  flex: 0;
  width: 320px;
`;

const HomeHeader: React.FC = () => {
  return (
    <StyledHomeHeader>
      <StyledHomeWriteupBox>
        <StyledHomeWriteupTitle>Create Quizzes</StyledHomeWriteupTitle>
        <StyledHomeWriteup>
          Easily create new quizzes with Quizard and share them with your
          students and peers!
        </StyledHomeWriteup>
        <CreateQuizButton />
      </StyledHomeWriteupBox>
      <HideOnSmall>
        <StyledOwl />
      </HideOnSmall>
    </StyledHomeHeader>
  );
};

export default HomeHeader;
