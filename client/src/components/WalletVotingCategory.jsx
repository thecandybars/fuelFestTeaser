import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import { getVotingCategory } from "../services/voting";
import VoteCarCard from "./VoteCarCard";

export default function WalletVotingCategory() {
  const { voteCategory } = useParams();
  const apiURL = process.env.REACT_APP_API;
  //   INIT
  const [voteCategoryFetched, setVoteCategoryFetched] = useState({});
  console.log(
    "🚀 ~ file: WalletVotingCategory.jsx ~ line 10 ~ WalletVotingCategory ~ voteCategoryFetched",
    voteCategoryFetched
  );
  useEffect(() => {
    fetchVoteCategory(voteCategory);
  }, []);
  async function fetchVoteCategory(voteCategory) {
    setVoteCategoryFetched(await getVotingCategory(voteCategory));
  }

  // Car Cards Render
  const renderVotingCarCards =
    Object.keys(voteCategoryFetched).length !== 0 &&
    // voteCategoryFetched.map((car) => <p>{car.car.title}</p>);
    voteCategoryFetched.map((car) => <VoteCarCard data={car} />);

  return (
    Object.keys(voteCategoryFetched).length !== 0 && (
      <MainContainer>
        <Title
          title={`Best ${voteCategory}`}
          // image={apiURL + "/" + voteCategoryFetched.icon}
          backButton="true"
        >
          {/* <img alt="an icon" src={`../icons/${voteCategory}.svg`} /> */}
        </Title>
        {renderVotingCarCards}
      </MainContainer>
    )
  );
}
