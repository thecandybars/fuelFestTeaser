import React from "react";
import styled from "styled-components";

export default function Title(props) {
  const StyledTitle = styled.h1`
    font-family: "Oswald", sans - serif;
  `;

  return <StyledTitle>{props.title}</StyledTitle>;
}
