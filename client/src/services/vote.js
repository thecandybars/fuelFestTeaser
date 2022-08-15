import axios from "axios";
// const apiURL = process.env.REACT_APP_API;
const apiURL = "";

export async function postCarVote(params) {
  const { data } = await axios.post(`${apiURL}/vote/car/${params.walletId}`, {
    carId: params.carId,
    categoryId: params.categoryId,
    votingTokens: params.votingTokens,
  });
  return data;
}
