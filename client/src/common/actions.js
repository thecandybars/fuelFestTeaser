import axios from "axios";

export async function getCars() {
  const { data } = await axios.get("/car");
  return data;
}
export async function getCarById(carId) {
  console.log("🚀 ~ file: actions.js ~ line 8 ~ getCarById ~ carId", carId);
  const { data } = await axios.get(`/car/${carId}`);
  return data;
}
export async function postFavCar(userId, carId) {
  await axios.post(`/user/${userId}/favCar/${carId}`);
}
export async function getFavCar(userId) {
  const { data } = await axios.get(`/favorite/${userId}/car`);
  return data;
}
