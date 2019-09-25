import React from 'react';
import styled from 'styled-components';
import UnselectedButton from '../common/buttons/UnselectedButton';
import CopyTextToClipboard from '../common/CopyTextToClipboard';
import OverlayModal from '../common/OverlayModal';

const defaultPromoText = 'Check out my new quiz made with Quizard!';

const SocialMediaRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
`;

interface IModalDivProps {
  isVisible: boolean;
}

const ModalDiv = styled.div`
  display: ${({ isVisible }: IModalDivProps) => isVisible ? `block` : `none`};
`;

const CopyTextToClipboardArea = styled.div`
  margin-top: 15px;
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
  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${defaultPromoText}%20${sharableLink}`;
    window.open(url, '_blank');
  };

  const shareTelegram = () => {
    const url =
      `https://telegram.me/share/url?url=${sharableLink}&text=${defaultPromoText}`;
    window.open(url, '_blank');
  };

  return (
    <ModalDiv isVisible={isVisible}>
      <OverlayModal isVisible={isVisible} onClose={onClose}>
        <h3>Share this Quiz</h3>
        <SocialMediaRow>
          <UnselectedButton onClick={shareTelegram}>Telegram</UnselectedButton>
          <UnselectedButton onClick={shareWhatsApp}>Whatsapp</UnselectedButton>
        </SocialMediaRow>
        <CopyTextToClipboardArea>
          <CopyTextToClipboard defaultText={sharableLink} />
        </CopyTextToClipboardArea>
      </OverlayModal>
    </ModalDiv>
  );
};

export default ShareQuizModal;
