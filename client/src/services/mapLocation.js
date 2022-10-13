import axios from "axios";
// import { userId } from "../common/getLoginData";

export async function getMapLocation(mapLocationId) {
  const { data } = await axios.get(`/mapLocation/${mapLocationId}`);
  return data;
}
