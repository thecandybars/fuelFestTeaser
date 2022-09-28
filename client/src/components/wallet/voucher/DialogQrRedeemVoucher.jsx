import { Dialog } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import styled from "styled-components";
import { clientConfirmsRedeemVoucher } from "../../../services/transaction";
import {
  getOwnerRedeemConfirm,
  getVendorRedeemConfirm,
} from "../../../services/voucher";
import { userId } from "../../../common/getLoginData";
import { useEffect } from "react";
import ConfirmCancelDialog from "../../_shared/ConfirmCancelDialog";

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
const StyledAccept = styled.div`
  font-size: 1rem;
  background-color: ${(props) => props.theme.green};
  margin: 10px auto;
  width: fit-content;
  padding: 5px 25px;
  border: none;
  border-radius: 25px;
`;
const StyledCancel = styled.div`
  font-size: 1rem;
  margin: 10px auto;
  padding: 5px 25px;
  width: fit-content;
  text-decoration: underline;
`;

export default function DialogQrRedeemVoucher(props) {
  const clientUrl = process.env.REACT_APP_CLIENT;
  const apiURL = process.env.REACT_APP_API;

  // CHECK FOR VENDOR CONFIRMATION
  const [vendorRedeemConfirm, setVendorRedeemConfirm] = useState(false);

  const checkVendorConfirm = async () => {
    const { data } = await getVendorRedeemConfirm(props.id);
    setVendorRedeemConfirm(data);
    if (!data)
      checkVendorConfirmInterval = setTimeout(checkVendorConfirm, 2000);
  };
  let checkVendorConfirmInterval;
  useEffect(() => {
    checkVendorConfirmInterval =
      !vendorRedeemConfirm && setTimeout(checkVendorConfirm, 2000);
    return () => clearTimeout(checkVendorConfirmInterval);
  }, []);

  // ONCE VENDOR CONFIRMED, ASK OWNER TO ACCEPT AND DO TRANSACTION
  const [voucherRedeemed, setVoucherRedeemed] = useState({});
  const [voucherConfirmed, setVoucherConfirmed] = useState({});
  Object.keys(voucherConfirmed).length > 0 &&
    console.log(
      "🚀 ~ file: DialogQrRedeemVoucher.jsx ~ line 87 ~ DialogQrRedeemVoucher ~ voucherConfirmed",
      typeof voucherConfirmed.data.confirm
    );
  const confirmRedeemVoucher = async () => {
    setVoucherConfirmed(await getOwnerRedeemConfirm(props.id, true));
    setVoucherRedeemed(await clientConfirmsRedeemVoucher(props.id, userId));
  };
  const cancelRedeemVoucher = async () =>
    setVoucherConfirmed(await getOwnerRedeemConfirm(props.id, false));

  // CLOSE DIALOG
  const handleDialogClose = () => {
    clearInterval(checkVendorConfirmInterval);
    checkVendorConfirmInterval = null;
    props.handleClose(false);
    props.clearDialog("");
    props.setReload(true);
  };

  //RENDER ELEMENTS
  const renderQrCode = (
    <>
      <StyledQr>
        <QRCodeSVG
          value={`${clientUrl}/voucher/vendorRedeem/${props.id}`}
          size="200px"
          level="L"
          includeMargin={true}
        />
      </StyledQr>
      <StyledNote>Go to vendors tent and scan this QR to redeem it</StyledNote>
      {/* This anchor is just for testing, is the same link on the QR */}
      <a href={`${clientUrl}/voucher/vendorRedeem/${props.id}`} target="blank">
        <p
          style={{ fontSize: "10px" }}
        >{`${clientUrl}/voucher/redeem/${props.id}`}</p>
      </a>
    </>
  );
  const renderVendorConfirm = (
    <>
      <StyledSubtitle>Vendor accepted your voucher.</StyledSubtitle>
      <StyledSubtitle>Confirm transaction?</StyledSubtitle>
      <StyledAccept onClick={confirmRedeemVoucher}>CONFIRM</StyledAccept>
      <StyledCancel onClick={cancelRedeemVoucher}>CANCEL</StyledCancel>
    </>
  );

  return (
    <Dialog open={props.open} onClose={handleDialogClose}>
      <DialogContainer>
        {Object.keys(voucherConfirmed).length === 0 ? (
          <>
            {/* Transactions hasn´t been confirmed yet */}
            <StyledTitle>{props.vendor}</StyledTitle>
            <StyledSubtitle>{props.title}</StyledSubtitle>
            <StyledImage alt="" src={`${apiURL}/${props.image}`} />
            {/* Display QR Code OR ask user to confirm transaction ? */}
            {!vendorRedeemConfirm ? renderQrCode : renderVendorConfirm}
            {/* Force check vendor confirm, just for testing */}
            {/* <button onClick={checkVendorConfirm}>Check vendor confirm</button> */}
          </>
        ) : (
          <>
            {/* Transaction confirmed! */}
            {
              <ConfirmCancelDialog
                title="Voucher Redeemed"
                subtitle="Transaction ID: "
                linkText={
                  Object.keys(voucherRedeemed).length > 0 &&
                  voucherRedeemed.data.transaction.id
                }
                handleClose={handleDialogClose}
                successful={voucherConfirmed.data.confirm}
              />
            }
          </>
        )}
      </DialogContainer>
    </Dialog>
  );
}
