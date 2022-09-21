import React from "react";
import { useParams } from "react-router-dom";

export default function RedeemVoucher() {
  const { voucherId } = useParams();
  return <div>RedeemVoucher {voucherId}</div>;
}
