import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;

  const StyledCard = styled.div`
    width: 150px;
    text-align: center;
    font-size: smaller;
    margin-top: 20px;
    p {
      margin-top: 5px;
    }
  `;
  const StyledCollection = styled.p`
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    width: 90%;
    margin: 0 auto;
    padding: 3px 0;
  `;
  const StyledBuyButton = styled.div`
    background-color: #00703d;
    width: fit-content;
    padding: 6px 25px;
    border: none;
    border-radius: 15px;
  `;
  const StyledDetailsButton = styled.div`
    color: #feae2e;
    width: fit-content;
  `;

  return (
    <StyledCard>
      <img alt="NFT Card of a car" src={`${apiURL}/${props.imgFront}`} />
      <StyledCollection>{props.collection}</StyledCollection>
      <p>{props.title}</p>
      <p style={{ color: "#feae2e" }}>{props.price} drift</p>
      <p
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <StyledDetailsButton>Details</StyledDetailsButton>
        <StyledBuyButton>Buy</StyledBuyButton>
      </p>
    </StyledCard>
  );
}
