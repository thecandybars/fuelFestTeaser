import axios from "axios";
// import { userId } from "../common/getLoginData";

export async function getNFTCards() {
  const { data } = await axios.get(`/asset/nftCards`);
  return data;
}
export async function getVouchers() {
  const { data } = await axios.get(`/asset/voucher`);
  return data;
}
export async function getVoucher(voucherId) {
  const { data } = await axios.get(`/asset/voucher/${voucherId}`);
  return data;
}
export async function getNFTCard(nftCardId) {
  const { data } = await axios.get(`/asset/nftCard/${nftCardId}`);
  return data;
}
export async function getAllAssets() {
  const { data } = await axios.get(`/asset`);
  return data;
}
export async function getAssetById(assetId) {
  const { data } = await axios.get(`/asset/byId/${assetId}`);
  return data;
}
export async function editAssetById(assetId, isListed, price) {
  const { data } = await axios.put(`/asset/byId/${assetId}`, {
    isListed,
    price,
  });
  return data;
}
export async function getAssetByWallet(walletId) {
  const { data } = await axios.get(`/asset/byWallet/${walletId}`);
  return data;
}
export async function buyAssetFromWallet(assetId, walletId) {
  const response = await axios.post(`/asset/${assetId}/buy/${walletId}`);
  return response;
}
