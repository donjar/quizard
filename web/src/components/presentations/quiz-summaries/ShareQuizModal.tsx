import React from 'react';
import styled from 'styled-components';
import { lgMax } from '../../../utils/media';
import UnselectedButton from '../common/buttons/UnselectedButton';
import CopyTextToClipboard from '../common/CopyTextToClipboard';
import OverlayModal from '../common/OverlayModal';

const defaultPromoText = encodeURIComponent('Check out my new quiz made with Quizard!');

const SocialMediaRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  width: 100%;

  & > * {
    margin: 0.5em 1em;
    min-width: 130px;

    @media (max-width: ${lgMax}) {
      width: 100%;
    }
  }
`;

interface IModalDivProps {
  isVisible: boolean;
}

const ModalDiv = styled.div`
  display: ${({ isVisible }: IModalDivProps) => isVisible ? `block` : `none`};
`;

const CopyTextToClipboardArea = styled.div`
  margin: 15px 0 10px 0;
  width: 100%;
`;

interface IShareQuizModalProps {
  isVisible: boolean;
  sharableLink: string;
  onClose: () => void;
}

const ShareQuizModal: React.FC<IShareQuizModalProps> = ({
  isVisible,
  sharableLink,
  onClose
}) => {
  const encodedLink = encodeURIComponent(sharableLink);
  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${defaultPromoText}%20${encodedLink}`;
    console.log(url);
    window.open(url, '_blank');
  };

  const shareTelegram = () => {
    const url =
      `https://telegram.me/share/url?url=${encodedLink}&text=${defaultPromoText}`;
    window.open(url, '_blank');
  };

  const shareEmail = () => {
    const bodyText =
      `Click on this link to access my quiz: ${sharableLink}`.split(' ').join('%20');
    const url = `mailto:?subject=${defaultPromoText}&body=${bodyText}`;
    window.location.href = url;
  };

  return (
    <ModalDiv isVisible={isVisible}>
      <OverlayModal isVisible={isVisible} onClose={onClose}>
        <h3>Share this Quiz</h3>
        <SocialMediaRow>
          <UnselectedButton onClick={shareTelegram}>Telegram</UnselectedButton>
          <UnselectedButton onClick={shareWhatsApp}>Whatsapp</UnselectedButton>
          <UnselectedButton onClick={shareEmail}>Email</UnselectedButton>
        </SocialMediaRow>
        <CopyTextToClipboardArea>
          <CopyTextToClipboard defaultText={sharableLink} />
        </CopyTextToClipboardArea>
      </OverlayModal>
    </ModalDiv>
  );
};

export default ShareQuizModal;
