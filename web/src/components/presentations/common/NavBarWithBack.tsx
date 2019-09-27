import React from 'react';
import { ChevronLeft, Home } from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import NakedButton from './buttons/NakedButton';
import NavBar from './NavBar';

const EmptyBox = styled.div`
  width: 72px;
`;

export const NavBarWithBack: React.FC = () => {
  return (
    <NavBar background={'var(--beige)'}>
      <Link to="/home">
        <NakedButton><ChevronLeft /> <Home /></NakedButton>
      </Link>
      <Quizard />
      <EmptyBox />
    </NavBar>
  );
};
