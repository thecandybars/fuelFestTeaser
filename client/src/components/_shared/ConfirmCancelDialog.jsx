import React from "react";
import dialogSuccessful from "../../img/dialogSuccessful.png";
import dialogDenied from "../../img/dialogDenied.png";
import styled from "styled-components";

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
  a {
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
ConfirmCancelDialog.defaultProps = {
  title: "",
  subtitle: "",
  linkPath: "#",
  linkText: "",
  successful: true,
};

export default function ConfirmCancelDialog(props) {
  return (
    <StyledConfirmTransaction>
      <img
        alt="Transaction Successful"
        src={props.successful ? dialogSuccessful : dialogDenied}
      />
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
      <a href={props.linkPath}>{props.linkText}</a>
      <div onClick={props.handleClose}>Close</div>
    </StyledConfirmTransaction>
  );
}
