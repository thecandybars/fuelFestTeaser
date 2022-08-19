import React from "react";
import style from "./css/VoucherCard.module.css";

export default function VoucherCard(props) {
  const apiURL = process.env.REACT_APP_API;

  return (
    <div className={style.card}>
      <img
        alt="A voucher"
        src={`${apiURL}/${props.data.voucher.image}`}
        className={style.image}
      />
      <p>{props.data.voucher.title}</p>
      <p style={{ color: "#feae2e" }}>{props.data.voucher.price} drift</p>
      <p
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <div className={style.detailsButton}>Details</div>
        <div className={style.buyButton}>Buy</div>
      </p>
    </div>
  );
}
