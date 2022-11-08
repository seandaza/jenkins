import React from "react";
import IMAGES from "../assets/images/images";
import styled from "styled-components";

export default function KnowMore (props) {
  const { knowRef } = props;
  return <Know onClick={() => knowRef.current.scrollIntoView({ behavior: 'smooth' })}>
    {props.children}
    <img className="arrow-link" src={IMAGES.ICON_ARROWDOWN} alt="know-more" />
  </Know>
};

const Know = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 2em;
  margin-bottom: 1em;
  cursor: pointer;
  p {
    margin: 0.2em;
  };
`;