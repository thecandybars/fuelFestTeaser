import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../css/NFTCard.module.css";
import DialogBuyVoucher from "./DialogBuyVoucher";

export default function VoucherCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { voucher } = props.data;

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className={style.card}>
      {/* <Modal open={modalIsOpen} onClose={handleModalClose}>
    <ModalBuyNFT data={props} />
  </Modal> */}
      <Link to={"/wallet/marketplace/voucher/" + voucher.assetId}>
        <img alt="NFT Card of a car" src={`${apiURL}/${voucher.image}`} />
      </Link>
      {/* <div className={style.collection}>{props.collection}</div> */}
      <p>{voucher.title}</p>
      <p style={{ color: "#feae2e" }}>{voucher.price} DRIFT</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <Link to={"/wallet/marketplace/voucher/" + voucher.assetId}>
          <div className={style.detailsButton}>Details</div>
        </Link>
        <div
          className={style.buyButton}
          onClick={(e) => {
            e.stopPropagation();
            setDialogOpen(true);
          }}
        >
          BUY
        </div>
      </div>
      {/* DIALOG WINDOW */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogBuyVoucher
          assetId={voucher.assetId}
          closeDialog={handleDialogClose}
        />
      </Dialog>
    </div>
  );
}
