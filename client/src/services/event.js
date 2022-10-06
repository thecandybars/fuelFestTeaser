import axios from "axios";
import { userId } from "../common/getLoginData";

export async function toggleFavEvent(eventId) {
  await axios.post(`/user/${userId}/favEvent/${eventId}`);
}
export async function getFavEvent() {
  const { data } = await axios.get(`/favorite/${userId}/event`);
  return data;
}
export async function getEvents() {
  const { data } = await axios.get(`/event`);
  return data;
}
