import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../../iconComponents";

const StyledTitle = styled.div`
  font-family: "Oswald";
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
  h1 {
    font-size: 2.3rem;
  }
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
            fontSize: "2rem",
            marginRight: "10px",
          }}
        />
      )}
      <h1>{props.children}</h1>
      {!!props.image && <StyledImage alt="An icon" src={props.image} />}
    </StyledTitle>
  );
}
