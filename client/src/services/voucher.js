import axios from "axios";
// import { userId } from "../common/getLoginData";

export async function getVouchersByWallet(walletId) {
  const { data } = await axios.get(`/voucher/wallet/${walletId}`);
  return data;
}

export async function getOwnerRedeemConfirm(voucherId, confirm) {
  const { data } = await axios.post(`voucher/redeem/owner/`, {
    voucherId,
    confirm,
  });
  return data;
}
export async function getVendorRedeemConfirm(voucherId) {
  const { data } = await axios.get(`voucher/redeem/vendor/${voucherId}`);
  return data;
}
export async function vendorRedeemVoucher(voucherId, userId) {
  const { data } = await axios.post(`voucher/redeem/vendor`, {
    voucherId,
    userId,
  });
  return data;
}
