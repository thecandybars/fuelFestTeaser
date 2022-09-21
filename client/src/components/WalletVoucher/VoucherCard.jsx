import { Dialog } from "@mui/material";
import React, { useState } from "react";
import style from "../css/VoucherCard.module.css";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";

const StyledCardContainer = styled.div`
  width: 50%;
  text-align: center;
  font-size: smaller;
  margin-top: 20px;
  padding: 5px;
`;
const StyledCardImage = styled.img`
  border: 2px solid #feae2e;
  border-radius: 5px;
`;

// DIALOG
const DialogContainer = styled.div`
  /* margin: 20px; */
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

export default function VoucherCard(props) {
  const clientUrl = process.env.REACT_APP_CLIENT;
  const apiURL = process.env.REACT_APP_API;

  // QR CODE DIALOG
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const handleQrOpen = () => setOpenQrDialog(true);
  const handleQrClose = () => setOpenQrDialog(false);

  return (
    <>
      {Object(props.data).length !== 0 && (
        <Dialog open={openQrDialog} onClose={handleQrClose}>
          <DialogContainer>
            <StyledTitle>{props.data.voucher.vendor.title}</StyledTitle>
            <StyledSubtitle>{props.data.voucher.title}</StyledSubtitle>
            <StyledImage alt="" src={`${apiURL}/${props.data.voucher.image}`} />
            <StyledQr>
              <QRCodeSVG
                value={`${clientUrl}/voucher/redeem/${props.data.voucher.assetId}`}
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
      )}
      <StyledCardContainer>
        <StyledCardImage
          alt="A voucher"
          src={`${apiURL}/${props.data.voucher.image}`}
        />
        <p>{props.data.voucher.title}</p>
        <p style={{ color: "#feae2e" }}>{props.data.voucher.price} drift</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "",
          }}
        >
          <div className={style.detailsButton}>Details</div>
          <div className={style.buyButton} onClick={handleQrOpen}>
            Redeem
          </div>
        </div>
      </StyledCardContainer>
    </>
  );
}
