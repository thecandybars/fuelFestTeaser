import axios from "axios";
import { userId } from "../common/getLoginData";

const apiURL = process.env.REACT_APP_API;
// const userId = process.env.REACT_APP_USER_ID;

export async function getCars() {
  const { data } = await axios.get(`${apiURL}/car`);
  return data;
}
export async function getCarById(carId) {
  const { data } = await axios.get(`${apiURL}/car/${carId}`);
  return data;
}
export async function postFavCar(carId) {
  await axios.post(`${apiURL}/user/${userId}/favCar/${carId}`);
}
export async function getFavCar() {
  const { data } = await axios.get(`${apiURL}/favorite/${userId}/car`);
  return data;
}
