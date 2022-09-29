import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import { getVoucher } from "../../../services/assets";
import MainContainer from "../../_shared/MainContainer";
import {
  vendorRedeemVoucher,
  getOwnerTransactionConfirm,
} from "../../../services/voucher";
import { userId } from "../../../common/getLoginData";
import NftDetailsDialogConfirm from "../../_shared/NftDetailsDialogConfirm";
import ConfirmCancelDialog from "../../_shared/ConfirmCancelDialog";
import sendImg from "../../../img/send.png";
import sendingImg from "../../../img/sending.png";

export default function VendorRedeemVoucher() {
  const { voucherId } = useParams();
  const [fetchedVoucher, setFetchedVoucher] = useState({});

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
  const acceptVoucher = async () => {
    const data = await vendorRedeemVoucher(voucherId, userId).catch((err) =>
      console.log(err)
    );
    setVendorConfirm(data);
  };
  const cancelVoucher = async () => {
    setVendorConfirm({ data: false });
  };

  // NFT Dialog Details Data
  const [nftDetailsDialogData, setNftDetailsDialogData] = useState([]);
  useEffect(() => {
    Object.keys(fetchedVoucher).length > 0 &&
      setNftDetailsDialogData([
        {
          label: "User",
          data: userId,
          highlight: false,
        },
        {
          label: "Voucher Id",
          data: voucherId,
          highlight: false,
        },
        {
          label: "Vendor",
          data: fetchedVoucher.vendor.title,
          highlight: false,
        },
        {
          label: "Description",
          data: fetchedVoucher.title,
          highlight: false,
        },
      ]);
  }, [fetchedVoucher, voucherId]);

  // CHECK FOR OWNER ACCEPTS TRANSACTION
  const [ownerAcceptedTransaction, setOwnerAcceptedTransaction] = useState({});
  console.log(
    "🚀 ~ file: VendorRedeemVoucher.jsx ~ line 76 ~ VendorRedeemVoucher ~ ownerAcceptedTransaction",
    ownerAcceptedTransaction
  );
  const checkOwnerAccepted = async () => {
    const response = await getOwnerTransactionConfirm(voucherId);
    setOwnerAcceptedTransaction(response);
    if (
      !response.data.confirm &&
      response.data.voucher.redeemedByVendor !== null
    )
      checkOwnerAcceptedTimeout = setTimeout(checkOwnerAccepted, 2000);
  };
  let checkOwnerAcceptedTimeout;
  useEffect(() => {
    checkOwnerAcceptedTimeout =
      vendorConfirm.data && setTimeout(checkOwnerAccepted, 2000);
    return () => clearTimeout(checkOwnerAcceptedTimeout);
  }, [vendorConfirm]);

  // DIALOG
  const [openSentDialog, setOpenSentDialog] = useState(false);
  const handleClose = () => setOpenSentDialog(false);
  useEffect(() => {
    Object.keys(vendorConfirm).length > 0 && setOpenSentDialog(true);
  }, [vendorConfirm]);

  // RENDER DIALOG
  // Its a lot of rules. I´m shure they can be cleaned!
  let renderDialog;
  // Sending
  if (Object.keys(vendorConfirm).length > 0 && vendorConfirm.data)
    renderDialog = (
      <ConfirmCancelDialog
        title="Sending request"
        successful={true}
        image={sendingImg}
      />
    );

  if (Object.keys(vendorConfirm).length > 0 && !vendorConfirm.data)
    // Cancelled by vendor
    renderDialog = (
      <ConfirmCancelDialog
        title="Transaction cancelled"
        subtitle="BY VENDOR"
        successful={false}
      />
    );
  if (
    // Sent to owner
    Object.keys(vendorConfirm).length > 0 &&
    vendorConfirm.data &&
    Object.keys(ownerAcceptedTransaction).length > 0 &&
    !ownerAcceptedTransaction.data.confirm
  )
    renderDialog = (
      <ConfirmCancelDialog
        title="Request sent"
        subtitle="Waiting for user to accept the request to proceed"
        successful={true}
        image={sendImg}
      />
    );
  if (
    // Accepted by owner
    Object.keys(vendorConfirm).length > 0 &&
    vendorConfirm.data &&
    Object.keys(ownerAcceptedTransaction).length > 0 &&
    ownerAcceptedTransaction.data.confirm &&
    ownerAcceptedTransaction.data.voucher.redeemedByOwner !== null &&
    ownerAcceptedTransaction.data.voucher.redeemedByVendor !== null
  )
    renderDialog = (
      <ConfirmCancelDialog
        title="Transaction accepted"
        subtitle="BY OWNER"
        successful={true}
      />
    );
  if (
    // Cancelled by owner
    Object.keys(vendorConfirm).length > 0 &&
    vendorConfirm.data &&
    Object.keys(ownerAcceptedTransaction).length > 0 &&
    !ownerAcceptedTransaction.data.confirm &&
    ownerAcceptedTransaction.data.voucher.redeemedByOwner == null &&
    ownerAcceptedTransaction.data.voucher.redeemedByVendor == null
  )
    renderDialog = (
      <ConfirmCancelDialog
        title="Transaction cancelled"
        subtitle="BY OWNER"
        successful={false}
      />
    );
  return (
    <MainContainer>
      {Object.keys(fetchedVoucher).length > 0 && (
        <NftDetailsDialogConfirm
          title="Details"
          details={nftDetailsDialogData}
          image={fetchedVoucher.image}
          description={fetchedVoucher.description}
          primaryButton={{
            label: "Accept voucher",
            action: acceptVoucher,
          }}
          secondaryButton={{
            label: "CANCEL",
            action: cancelVoucher,
          }}
        />
      )}

      <Dialog onClose={handleClose} open={openSentDialog}>
        {renderDialog}
        {/* {Object.keys(vendorConfirm).length > 0
          ? vendorConfirm.data
            ? "Sent to owner"
            : "Cancelled by vendor"
          : null}
        {Object.keys(ownerAcceptedTransaction).length > 0
          ? ownerAcceptedTransaction.data.voucher.redeemedByVendor === null
            ? "Cancelled by owner"
            : ownerAcceptedTransaction.data.confirm && "Accepted by owner"
          : null} */}
      </Dialog>
    </MainContainer>
  );
}
