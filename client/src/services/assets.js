import axios from "axios";
// import { userId } from "../common/getLoginData";

export async function getNFTCards() {
  const { data } = await axios.get(`/asset/nftCards`);
  return data;
}
