import React, { useContext, useEffect, useState } from "react";
import { walletId } from "../../common/getLoginData";
import styled from "styled-components";

const DialogContainer = styled.div`
  height: fit-content;
  padding: 25px 45px;
  background-color: rgba(10, 10, 10, 0.97);
  border: 0;
  color: ${(props) => props.theme.white};
  font-family: "Oswald";
`;
const StyledFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  div {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
  }
  h1 {
    color: ${(props) => props.theme.green};
    font-size: 2.3rem;
  }
  img {
    width: 100px;
  }
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
  margin-bottom: 25px;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
  }
  h3 {
    min-width: 130px;
    font-size: 1.1rem;
  }
  p {
    font-family: "Oswald";
    font-size: 1.1rem;
    color: ${(props) => props.theme.yellow};
  }
`;
const StyledBottomLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  font-size: 1.3rem;
`;
const StyledButtonYes = styled.div`
  width: 80%;
  margin: 5px 0;
  padding: 1px 10px;
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  text-align: center;
`;
const StyledButtonNo = styled.div`
  width: 70%;
  margin: 5px 0;
  padding: 1px 10px;
  text-decoration: underline;
  /* background-color: ${(props) => props.theme.red}; */
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  text-align: center;
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
      <StyledFirstLine>
        <div>
          <h1>{props.title}</h1>
        </div>
        <img alt="Preview asset" src={`${apiURL}/${props.image}`} />
        <h2>{props.subtitle}</h2>
      </StyledFirstLine>

      <StyledSummary>
        <h2>Summary</h2>
        {props.details.map((detail) => (
          <div key={detail.label}>
            <h3>{detail.label}</h3>
            {detail.highlight ? <p>{detail.data}</p> : <p>{detail.data}</p>}
            {detail.additional && detail.additional}
          </div>
        ))}
      </StyledSummary>
      {/* <StyledDescription>{props.description}</StyledDescription>
      <StyledButton onClick={props.primaryButton.action}>
        {props.primaryButton.label}
      </StyledButton>
      <StyledBack onClick={props.secondaryButton.action}>
        {props.secondaryButton.label}
      </StyledBack> */}

      <StyledBottomLine>
        <StyledButtonYes onClick={props.primaryButton.action}>
          {props.primaryButton.label}
        </StyledButtonYes>
        <StyledButtonNo
          onClick={props.secondaryButton.action}
        >{`CANCEL`}</StyledButtonNo>
      </StyledBottomLine>
    </DialogContainer>
  );
}
