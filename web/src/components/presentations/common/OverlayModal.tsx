import React from 'react';
import styled from 'styled-components';
import { smMax } from '../../../utils/media';
import CloseButton from './buttons/CloseButton';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const OverlayModalCard = styled.div`
  position:fixed;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);

  background: var(--beige);
  box-shadow: 6px 6px 0px var(--dark-beige);
  border-radius: 20px;
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${smMax}) {
    width: 75%;
  }
`;

const CloseButtonDiv = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

// prevent body scroll code from https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
const preventBodyScroll = () => {
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
};

const enableBodyScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  // tslint:disable-next-line: radix
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
};

interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const OverlayModal: React.FC<IModalProps> = (props) => {
  if (props.isVisible) {
    preventBodyScroll();
  } else {
    enableBodyScroll();
  }

  return (
    <ModalBackground>
      <OverlayModalCard>
        <CloseButtonDiv>
          <CloseButton onClick={props.onClose} />
        </CloseButtonDiv>
        {props.children}
      </OverlayModalCard>
    </ModalBackground>
  );
};

export default OverlayModal;
