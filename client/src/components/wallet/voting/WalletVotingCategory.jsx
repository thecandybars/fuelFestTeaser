import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainContainer from "../../_shared/MainContainer";
import Title from "../../../components/_shared/Title";
import { getVotingCategory } from "../../../services/voting";
import VoteCarCard from "./VoteCarCardMain";

export default function WalletVotingCategory() {
  const { voteCategory } = useParams();
  // const apiURL = process.env.REACT_APP_API;
  //   INIT
  const [voteCategoryFetched, setVoteCategoryFetched] = useState({});
  console.log(
    "🚀 ~ file: WalletVotingCategory.jsx ~ line 13 ~ WalletVotingCategory ~ voteCategoryFetched",
    voteCategoryFetched
  );

  useEffect(() => {
    fetchVoteCategory(voteCategory);
  }, [voteCategory]);
  async function fetchVoteCategory(voteCategory) {
    setVoteCategoryFetched(await getVotingCategory(voteCategory));
  }

  // Car Cards Render
  const renderVotingCarCards =
    Object.keys(voteCategoryFetched).length !== 0 &&
    voteCategoryFetched.map((car) => (
      <Link to={`/car/${car.car.id}`} key={car.car.id}>
        <VoteCarCard data={car} />
      </Link>
    ));

  return (
    Object.keys(voteCategoryFetched).length !== 0 && (
      <MainContainer>
        <Title backButton="true">{`Best ${voteCategory}`}</Title>
        {renderVotingCarCards}
      </MainContainer>
    )
  );
}
