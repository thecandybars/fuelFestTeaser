import axios from "axios";
import { userId } from "../common/getLoginData";
const apiURL = process.env.REACT_APP_API;
// const userId = process.env.REACT_APP_USER_ID;

export async function getUser() {
  const { data } = await axios.get(`${apiURL}/user/${userId}`);
  return data;
}
