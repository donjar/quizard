import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import { Copy } from 'react-feather';
import DarkButton from './buttons/DarkButton';

const CopyTextToClipboardArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width 100%;
`;

const StyledInput = styled.input`
  font-size: 0.8rem;
  font-weight: lighter;

  padding: 12px 15px;
  width: calc(100% - 30px);
  background: var(--pale-grey);

  border: transparent;
  border-radius: 15px 0 0 15px;
`;

const CopyButton = styled(DarkButton)`
  width: 100px;

  display: flex;
  align-items: center;

  text-align: center;
  overflow-wrap: break-word;
  font-size: 0.8rem;
  border-radius: 0 15px 15px 0;

  & > * {
    height: 18px;
  }
`;

interface ICopyTextToClipboardProps {
  defaultText: string;
}

const CopyTextToClipboard: React.FC<ICopyTextToClipboardProps> = ({
  defaultText
}) => {
  const [copyText, setCopyText] = useState('Copy');
  const textAreaRef = createRef<HTMLInputElement>();

  const copyToClipboard = (e: any) => {
    const node = textAreaRef.current;
    if (node) {
      node.select();
    }
    document.execCommand('copy');
    e.target.focus();
    setCopyText('Copied!');
  };

  return (
    <CopyTextToClipboardArea>
      <StyledInput
        ref={textAreaRef}
        value={defaultText}
      />
      {
        document.queryCommandSupported('copy') &&
          <CopyButton onClick={copyToClipboard}>
            <Copy /> {copyText}
          </CopyButton>
      }
    </CopyTextToClipboardArea>
  );
};

export default CopyTextToClipboard;
