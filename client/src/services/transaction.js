import axios from "axios";
// import { userId } from "../common/getLoginData";

export async function vendorRedeemVoucher(voucherId) {
  const { data } = await axios.post(`transaction/voucher/${voucherId}`);
  return data;
}
