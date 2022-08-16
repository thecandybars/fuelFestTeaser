import axios from "axios";

export async function getWallet(walletId) {
  const { data } = await axios.get(`/wallet/${walletId}`);
  return data;
}
export async function manageTokens(data) {
  const response = await axios.put(`/wallet/${data.walletId}/manage`, {
    liquid: data.liquid,
    frozen: data.frozen,
  });
  return response;
}
