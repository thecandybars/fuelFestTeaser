import axios from "axios";

export async function postCarVote(params) {
  const { data } = await axios.post(`/vote/car/${params.walletId}`, {
    carId: params.carId,
    categoryId: params.categoryId,
    votingTokens: params.votingTokens,
  });
  return data;
}
