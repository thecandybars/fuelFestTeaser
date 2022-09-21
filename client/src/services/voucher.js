import axios from "axios";
// import { userId } from "../common/getLoginData";

export async function getVouchersByWallet(walletId) {
  const { data } = await axios.get(`/voucher/wallet/${walletId}`);
  return data;
}
