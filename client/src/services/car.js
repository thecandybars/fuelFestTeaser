import axios from "axios";
import { userId } from "../common/getLoginData";

export async function getCars() {
  const { data } = await axios.get(`/car`);
  return data;
}
export async function getCarById(carId) {
  const { data } = await axios.get(`/car/${carId}`);
  return data;
}
export async function postFavCar(carId) {
  await axios.post(`/user/${userId}/favCar/${carId}`);
}
export async function getFavCar() {
  const { data } = await axios.get(`/favorite/${userId}/car`);
  return data;
}
