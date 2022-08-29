import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../css/NFTCard.module.css";
import ModalBuyNFT from "./ModalBuyNFT";

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { astNFTCard } = props.data;

  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function handleModalClose() {
    setModalIsOpen(false);
  }

  return (
    <div className={style.card}>
      {/* <Modal open={modalIsOpen} onClose={handleModalClose}>
        <ModalBuyNFT data={props} />
      </Modal> */}
      <Link to={"/wallet/marketplace/" + astNFTCard.assetId}>
        <img
          alt="NFT Card of a car"
          src={`${apiURL}/${astNFTCard.imageFront}`}
        />
      </Link>
      {/* <div className={style.collection}>{props.collection}</div> */}
      <p>{astNFTCard.name}</p>
      <p style={{ color: "#feae2e" }}>{astNFTCard.price} DRIFT</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <Link to={"/wallet/marketplace/" + astNFTCard.id}>
          <div className={style.detailsButton}>Details</div>
        </Link>
        <div
          className={style.buyButton}
          onClick={(e) => {
            e.stopPropagation();
            props.buyAction(astNFTCard.assetId);
          }}
        >
          BUY
        </div>
      </div>
    </div>
  );
}
