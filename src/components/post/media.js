import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Fig = styled.figure`
  padding: 8px;
`;

const Img = styled.img`
  width: 100%;
`;

export const Image = ({ src, alt, desc }) => (
  <Fig>
    <Img src={src} alt={alt} />
    {desc && <p>{desc}</p>}
  </Fig>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  desc: PropTypes.string
};

export default { Image };
