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
export async function getAsset(assetId) {
  const { data } = await axios.get(`/asset/byId/${assetId}`);
  return data;
}
export async function getAllAssets() {
  const { data } = await axios.get(`/asset`);
  return data;
}
