import axios from "axios";

export async function clientConfirmsRedeemVoucher(voucherId) {
  const { data } = await axios.post(`transaction/voucher/${voucherId}`);
  return data;
}
