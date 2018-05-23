import { css } from 'styled-components';

export const MOBILE_BREAKPOINT = 560;

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${MOBILE_BREAKPOINT}px) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${MOBILE_BREAKPOINT}px) {
      ${css(...args)};
    }
  `
};

export default { media };
