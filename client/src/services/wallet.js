import axios from "axios";
// const apiURL = process.env.REACT_APP_API;
// const walletId = process.env.REACT_APP_WALLET_ID;
const apiURL = "";

export async function getWallet(walletId) {
  const { data } = await axios.get(`${apiURL}/wallet/${walletId}`);
  return data;
}
export async function manageTokens(data) {
  const response = await axios.put(`${apiURL}/wallet/${data.walletId}/manage`, {
    liquid: data.liquid,
    frozen: data.frozen,
  });
  return response;
}
