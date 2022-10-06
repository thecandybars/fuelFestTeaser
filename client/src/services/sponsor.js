import axios from "axios";
import { userId } from "../common/getLoginData";

export async function toggleFavSponsor(sponsorId) {
  await axios.post(`/user/${userId}/favSponsor/${sponsorId}`);
}
export async function getFavSponsor() {
  const { data } = await axios.get(`/favorite/${userId}/sponsor`);
  return data;
}
export async function getSponsors() {
  const { data } = await axios.get(`/sponsor`);
  return data;
}
