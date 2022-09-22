import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVoucher } from "../../../services/assets";
import MainContainer from "../../_shared/MainContainer";
import Title from "../../_shared/Title";
import { vendorRedeemVoucher } from "../../../services/transaction";

export default function RedeemVoucher() {
  const { voucherId } = useParams();
  const [fetchedVoucher, setFetchedVoucher] = useState({});
  console.log(
    "🚀 ~ file: RedeemVoucher.jsx ~ line 10 ~ RedeemVoucher ~ fetchedVoucher",
    fetchedVoucher
  );

  useEffect(() => {
    fetchVoucher();
  }, []);
  const fetchVoucher = async () =>
    setFetchedVoucher(await getVoucher(voucherId));
  return (
    <MainContainer>
      <Title>Vendor Redeem Voucher</Title>
      {voucherId}
      <Button onClick={() => vendorRedeemVoucher(voucherId)}>Yes?</Button>
    </MainContainer>
  );
}
