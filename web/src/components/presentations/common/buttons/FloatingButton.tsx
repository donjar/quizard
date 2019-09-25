import styled from 'styled-components';
import BigDarkButton from './BigDarkButton';

const FloatingButton = styled(BigDarkButton)`
  position: fixed;
  right: 10px;
  bottom: 10px;

  z-index: 999;
`;

export default FloatingButton;
