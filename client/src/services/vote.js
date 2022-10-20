import axios from "axios";

export async function postCarVote(params) {
  const { data } = await axios.post(`/vote/car/${params.walletId}`, {
    carId: params.carId,
    categoryId: params.categoryId,
    votingTokens: params.votingTokens,
  });
  return data;
}
export async function updateCarVote(params) {
  const { data } = await axios.put(`/vote/car/${params.voteId}`, {
    votingTokens: params.votingTokens,
  });
  return data;
}
export async function deleteCarVote(voteId) {
  console.log("🚀 ~ file: vote.js ~ line 18 ~ deleteCarVote ~ voteId", voteId);
  const { data } = await axios.delete(`/vote/car/${voteId}`);
  return data;
}
export async function getAllVoteCategories() {
  const { data } = await axios.get(`/vote/category`);
  return data;
}
