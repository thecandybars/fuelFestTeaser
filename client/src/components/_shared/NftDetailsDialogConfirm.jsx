import React, { useContext, useEffect, useState } from "react";
import { walletId } from "../../common/getLoginData";
import styled from "styled-components";

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 15px;
  background-color: ${(props) => props.theme.dialogBackground};
  border: 0;
  color: #d9d9d9;
`;
const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  color: ${(props) => props.theme.yellow};
  margin-left: 25px;
  margin-bottom: 20px;
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
  }
`;
const StyledImage = styled.img`
  width: 150px;
  margin: 15px auto;
`;
const StyledSummary = styled.div`
  div {
    display: flex;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    width: 130px;
    font-size: 1.1rem;
    color: ${(props) => props.theme.white};
  }
  h5 {
    font-size: 1.1rem;
    color: ${(props) => props.theme.green};
  }
  p {
    font-family: "Oswald";
    font-size: 1.1rem;
    color: ${(props) => props.theme.yellow};
  }
`;
const StyledDescription = styled.p`
  font-size: 1rem;
  margin: 0 15px;
`;
const StyledBack = styled.p`
  font-size: 1.4rem;
  text-decoration: underline;
  font-family: "Oswald";
  margin: 0 15px;
`;
const StyledButton = styled.div`
  width: 70%;
  margin: 15px 0;
  padding: 1px 10px;
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  font-size: 1.4rem;
  text-align: center;
`;
const StyledConfirmTransaction = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.dialogBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 70%;
  }
  h2 {
    font-size: 2.7rem;
    color: ${(props) => props.theme.yellow};
    text-align: center;
    margin: 15px 0;
  }
  p {
    color: ${(props) => props.theme.white};
    font-family: "Oswald";
    font-size: 1.3rem;
  }
  p span {
    color: ${(props) => props.theme.yellow};
  }
  div {
    width: 40%;
    margin: 15px 0;
    padding: 1px 10px;
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border-radius: 20px;
    font-family: "Oswald";
    font-size: 1.5rem;
    text-align: center;
  }
`;

NftDetailsDialogConfirm.defaultProps = {
  title: "",
  subtitle: "",
  details: [{ label: "", data: "", highlight: false }],
  image: "#",
  description: "",
  primaryButton: {
    label: "",
    action: () => console.log("Primary button clicked"),
  },
  secondaryButton: {
    label: "",
    action: () => console.log("Secondary button clicked"),
  },
  onClose: () => console.log("Closing!"),
};

export default function NftDetailsDialogConfirm(props) {
  const apiURL = process.env.REACT_APP_API;

  return (
    <DialogContainer>
      <StyledHeader>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </StyledHeader>
      <StyledSummary>
        {props.details.map((detail) => (
          <div key={detail.label}>
            <h3>{detail.label}</h3>
            {detail.highlight ? <p>{detail.data}</p> : <p>{detail.data}</p>}
          </div>
        ))}
      </StyledSummary>
      <StyledImage alt="Preview asset" src={`${apiURL}/${props.image}`} />
      <StyledDescription>{props.description}</StyledDescription>
      <StyledButton onClick={props.primaryButton.action}>
        {props.primaryButton.label}
      </StyledButton>
      <StyledBack onClick={props.secondaryButton.action}>
        {props.secondaryButton.label}
      </StyledBack>
    </DialogContainer>
  );
}
