import { keyframes } from 'styled-components';

export const loadIn = keyframes`
  0% {
    transform: translateY(40px);
    opacity: 0;
  }

  70% {
    transform: translateY(10px);
    opacity: 0.8;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default loadIn;
