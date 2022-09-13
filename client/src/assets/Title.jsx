import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../iconComponents";

const StyledTitle = styled.h1`
  font-family: "Oswald";
  display: flex;
  align-items: flex-start;
`;
const StyledImage = styled.img`
  margin-left: 120px;
`;
export default function Title(props) {
  const navigate = useNavigate();

  return (
    <StyledTitle style={{ color: props.color ? props.color : "white" }}>
      {!!props.backButton && (
        <ArrowBack
          onClick={() => navigate(-1)}
          style={{
            fill: props.color ? props.color : "white",
            fontSize: "3rem",
            marginRight: "5px",
          }}
        />
      )}
      {props.title}
      {!!props.image && <StyledImage alt="An icon" src={props.image} />}
      {props.children}
    </StyledTitle>
  );
}
