import { Dialog } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import styled from "styled-components";

// DIALOG
const DialogContainer = styled.div`
  width: 300px;
  height: 90%;
  padding: 15px;
  background-color: ${(props) => props.theme.dialogBackground};
  border: 0;
  color: ${(props) => props.theme.white};
  text-align: center;
`;
const StyledTitle = styled.h2`
  color: ${(props) => props.theme.red};
  font-size: 1.7rem;
`;
const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.yellow};
  font-size: 1.3rem;
`;
const StyledImage = styled.img`
  width: 150px;
  margin: 20px;
`;
const StyledQr = styled.div`
  /* padding: 10px; */
  /* margin: 10px; */
`;
const StyledNote = styled.p`
  font-size: 0.8rem;
  margin: 10px auto;
  width: 200px;
  padding: 10px;
  /* border: 1px solid red; */
`;

export default function DialogQrRedeemVoucher(props) {
  const clientUrl = process.env.REACT_APP_CLIENT;
  const apiURL = process.env.REACT_APP_API;

  return (
    <Dialog open={props.open} onClose={() => props.handleClose(false)}>
      <DialogContainer>
        <StyledTitle>{props.vendor}</StyledTitle>
        <StyledSubtitle>{props.title}</StyledSubtitle>
        <StyledImage alt="" src={`${apiURL}/${props.image}`} />
        <StyledQr>
          <QRCodeSVG
            value={`${clientUrl}/voucher/redeem/${props.assetId}`}
            size="200px"
            level="L"
            includeMargin={true}
          />
        </StyledQr>
        <StyledNote>
          Go to vendors tent and scan this QR to redeem it
        </StyledNote>
      </DialogContainer>
    </Dialog>
  );
}
