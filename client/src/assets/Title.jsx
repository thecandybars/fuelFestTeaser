import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../iconComponents";

const StyledTitle = styled.h1`
  font-family: "Oswald";
  display: flex;
  align-items: flex-start;
`;
const StyledBackButton = styled.img`
  width: 35px;
  padding-right: 10px;
  filter: invert(95%) sepia(5%) saturate(169%) hue-rotate(244deg)
    brightness(118%) contrast(100%);
`;
const StyledImage = styled.img`
  margin-left: 120px;
`;
const arrowBackStyle = {
  fill: "white",
  fontSize: "3rem",
  marginRight: "10px",
};
export default function Title(props) {
  const navigate = useNavigate();

  return (
    <StyledTitle>
      {!!props.backButton && (
        <ArrowBack onClick={() => navigate(-1)} style={{ ...arrowBackStyle }} />
      )}
      {props.title}
      {!!props.image && <StyledImage alt="An icon" src={props.image} />}
      {props.children}
    </StyledTitle>
  );
}
