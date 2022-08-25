import axios from "axios";

export async function getVotingCategory(voteCategory) {
  const { data } = await axios.get(`/vote/category/${voteCategory}`);
  return data;
}
