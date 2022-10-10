import axios from "axios";
import { userId } from "../common/getLoginData";

export async function toggleFavVendor(vendorId) {
  await axios.post(`/user/${userId}/favVendor/${vendorId}`);
}
export async function getFavVendor() {
  const { data } = await axios.get(`/favorite/${userId}/vendor`);
  return data;
}
export async function getVendors() {
  const { data } = await axios.get(`/vendor`);
  return data;
}
