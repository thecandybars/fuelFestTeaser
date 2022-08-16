import axios from "axios";

export async function toggleFavEvent(eventId) {
  await axios.post(
    `/user/ddf40198-fc6c-4595-95cc-bda6d77fffaa/favEvent/${eventId}`
  );
}
export async function getFavEvent() {
  const { data } = await axios.get(
    `/favorite/ddf40198-fc6c-4595-95cc-bda6d77fffaa/event`
  );
  return data;
}
export async function getEvents() {
  const { data } = await axios.get(`/event`);
  return data;
}
