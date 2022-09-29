import axios from "axios";

export async function postVoucherRedeemTransaction(voucherId) {
  const { data } = await axios.post(`transaction/voucher/${voucherId}`);
  return data;
}
