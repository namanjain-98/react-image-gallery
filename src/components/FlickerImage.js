import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;


export const FlickerImage = ({ url, key ,handleClick }) => {
  return (
    <>   
      <Img className="gallery-item" key={key} src={url}  onClick={() => handleClick(url)} alt="" />
    </>
  )
}
