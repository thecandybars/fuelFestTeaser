import axios from "axios";
import { userId } from "../common/getLoginData";

export async function getUser() {
  const { data } = await axios.get(`/user/${userId}`);
  return data;
}
