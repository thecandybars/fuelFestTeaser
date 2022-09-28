import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getVoucher } from "../../../services/assets";
import MainContainer from "../../_shared/MainContainer";
import Title from "../../_shared/Title";
import { vendorRedeemVoucher } from "../../../services/voucher";
import { userId } from "../../../common/getLoginData";

export default function VendorRedeemVoucher() {
  const { voucherId } = useParams();
  const [fetchedVoucher, setFetchedVoucher] = useState({});
  const [redeemedVoucher, setRedeemedVoucher] = useState({});

  useEffect(() => {
    fetchVoucher();
  }, []);
  const fetchVoucher = async () =>
    setFetchedVoucher(await getVoucher(voucherId));

  // VENDOR CONFIRMATION
  const [vendorConfirm, setVendorConfirm] = useState({});
  console.log(
    "🚀 ~ file: VendorRedeemVoucher.jsx ~ line 27 ~ VendorRedeemVoucher ~ vendorConfirm",
    vendorConfirm
  );
  const redeemVoucher = async () => {
    const data = await vendorRedeemVoucher(voucherId, userId).catch((err) =>
      console.log(err)
    );
    setVendorConfirm(data);
  };

  return (
    <MainContainer>
      <Title>Vendor Redeem Voucher</Title>
      {voucherId}
      {Object.keys(vendorConfirm).length === 0 ? (
        <Button onClick={redeemVoucher}>Confirm?</Button>
      ) : (
        <p>Confirmed!!!</p>
      )}
    </MainContainer>
  );
}
