import axios from "axios";
const apiURL = process.env.REACT_APP_API;

export async function toggleFavEvent(eventId) {
  await axios.post(
    `${apiURL}/user/ddf40198-fc6c-4595-95cc-bda6d77fffaa/favEvent/${eventId}`
  );
}
export async function getFavEvent() {
  const { data } = await axios.get(
    `${apiURL}/favorite/ddf40198-fc6c-4595-95cc-bda6d77fffaa/event`
  );
  return data;
}
export async function getEvents() {
  const { data } = await axios.get(`${apiURL}/event`);
  return data;
}
