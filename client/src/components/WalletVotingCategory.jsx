import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import { getVotingCategory } from "../services/voting";
import VoteCarCard from "./VoteCarCard";

export default function WalletVotingCategory() {
  const { voteCategory } = useParams();
  const apiURL = process.env.REACT_APP_API;
  //   INIT
  const [voteCategoryFetched, setVoteCategoryFetched] = useState({});

  useEffect(() => {
    fetchVoteCategory(voteCategory);
  }, []);
  async function fetchVoteCategory(voteCategory) {
    setVoteCategoryFetched(await getVotingCategory(voteCategory));
  }

  // Car Cards Render
  const renderVotingCarCards =
    Object.keys(voteCategoryFetched).length !== 0 &&
    voteCategoryFetched.map((car) => (
      <Link to={`/car/${car.car.id}`}>
        <VoteCarCard data={car} />
      </Link>
    ));

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
