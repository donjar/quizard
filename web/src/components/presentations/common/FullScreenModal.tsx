import React from 'react';
import styled from 'styled-components';
import { smMax } from '../../../utils/media';
import WholeScreenCard from '../common/WholeScreenCard';

const defaultModalContentWidth = `360px`;
const wideModalContentWidth = `460px`;

const StyledFullScreenModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark-blue);
  height: 100%;
  min-height: 100vh;
`;

const ModalContents = styled.div`
  padding: 20px;
  width: ${({ wide }: IFullScreenModalProps) => wide ? wideModalContentWidth : defaultModalContentWidth};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${smMax}) {
    width: calc(100% - 40px);
  }

  & > * {
    margin: 10px 0;
    text-align: center;
  }
`;

interface IFullScreenModalProps {
  wide?: boolean;
}

const FullScreenModal: React.FC<IFullScreenModalProps> = ({
  wide, children
}) => {
  return (
    <StyledFullScreenModal>
      <WholeScreenCard>
        <ModalContents wide={wide}>
          {children}
        </ModalContents>
      </WholeScreenCard>
    </StyledFullScreenModal>
  );
};

export default FullScreenModal;
