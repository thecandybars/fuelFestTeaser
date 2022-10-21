import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteCarVote,
  postCarVote,
  updateCarVote,
} from "../../../services/vote";
import { walletId } from "../../../common/getLoginData";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Slider, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, themeMUI } from "../../../common/theme";

const StyledContainer = styled.div`
  padding: 30px;
  background-color: ${(props) => props.theme.black};
`;
const StyledTitle = styled.h3`
  font-size: 1.8rem;
  color: ${(props) => props.theme.darkGreen};
  margin-bottom: 15px;
`;
const StyledTopInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-family: "Oswald";
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 23px;
    margin-right: 3px;
    filter: invert(63%) sepia(65%) saturate(507%) hue-rotate(353deg)
      brightness(102%) contrast(99%);
  }
  h4 {
    font-size: 1rem;
    color: ${(props) => props.theme.white};
    width: 100px;
  }
  p {
    font-size: 1rem;
    color: ${(props) => props.theme.yellow};
  }
`;
const StyledVoteCard = styled.div`
  font-size: 1rem;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    /* width: 350px; */
  }
  h4 {
    display: flex;
    color: ${(props) => props.theme.white};
  }
  h3 {
    color: ${(props) => props.theme.yellow};
    font-size: 1.7rem;
  }
  img {
    width: 100px;
    margin-left: 30px;
  }
`;
const StyledSlider = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  input {
    height: 10px;
    margin: 20px 0;
    width: 85%;
    -webkit-appearance: none;
    background: ${(props) => props.theme.green};
    border-radius: 20px;
    border: 2px solid ${(props) => props.theme.white};
  }
  input::-webkit-slider-thumb {
    height: 24px;
    width: 24px;
    border-radius: 20px;
    background: ${(props) => props.theme.yellow};
    cursor: pointer;
    -webkit-appearance: none;
  }

  span {
    font-family: "Oswald";
    color: ${(props) => props.theme.white};
    margin-left: 10px;
    font-size: 0.8rem;
  }
`;
const StyledButtons = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.white};
  font-family: "Oswald";
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 30px;
  div:nth-child(1) {
    background-color: ${(props) => props.theme.green};
    width: 70%;
    border-radius: 20px;
    margin-bottom: 15px;
  }
  div:nth-child(2) {
    width: 70%;
    color: ${(props) => props.theme.white};
    text-decoration: underline;
  }
`;

export default function VoteCategory(props) {
  console.log(
    "🚀 ~ file: VoteCategory.jsx ~ line 11 ~ VoteCategory ~ props",
    props
  );
  const [carList, setCarList] = useState([]);
  const [warning, setWarning] = useState([""]);
  const apiURL = process.env.REACT_APP_API;

  useEffect(() => {
    const tempCarList = props.cars.map((car) => ({
      id: car.id,
      title: car.title,
      image: car.carImages[0].image,
      owner: car.carOwner.name,
      vote: props.votes.find((vote) => vote.carId === car.id).votingTokens,
      action: null,
    }));
    if (props.lastCarClicked.action === "create") {
      tempCarList.unshift({
        id: props.lastCarClicked.carId,
        title: props.lastCarClicked.title,
        image: props.lastCarClicked.image,
        owner: props.lastCarClicked.owner,
        vote: props.votes.find((vote) => vote.carId === props.lastCarClicked.id)
          ? props.votes.find((vote) => vote.carId === props.lastCarClicked.id)
              .votingTokens
          : 0,
        action: "create",
      });
    }
    setCarList(tempCarList);
  }, [props]);

  // HANDLE VOTE UPDATE
  const handleVoteUpdate = (e) => {
    setWarning("");
    // Sums all votes EXCEPT this car
    let totalVoting = carList.reduce(
      (prev, car) => (car.id !== e.target.id ? prev + car.vote : prev),
      0
    );
    if (totalVoting > props.wallet.frozen) totalVoting = props.wallet.frozen;

    const available = props.wallet.frozen - totalVoting;

    let vote = percentageTodrift(e.target.value);
    if (vote > available) {
      // setWarning("Max reached!");
      vote = available;
    }

    let action;
    if (carList.find((car) => car.id === e.target.id).action !== "create")
      // action = vote > 0 ? "update" : "delete";
      action = "update";
    else action = "create";

    setCarList((prev) =>
      prev.map((car) =>
        car.id === e.target.id ? { ...car, vote, action } : { ...car }
      )
    );
  };
  const handleVoteUpdateMUI = (e) => {
    setWarning("");
    // Sums all votes EXCEPT this car
    let totalVoting = carList.reduce(
      (prev, car) => (car.id !== e.target.name ? prev + car.vote : prev),
      0
    );
    if (totalVoting > props.wallet.frozen) totalVoting = props.wallet.frozen;
    const available = props.wallet.frozen - totalVoting;
    let vote = percentageTodrift(e.target.value);
    if (vote > available) {
      // setWarning("Max reached!");
      vote = available;
    }
    let action;
    if (carList.find((car) => car.id === e.target.name).action !== "create")
      // action = vote > 0 ? "update" : "delete";
      action = "update";
    else action = "create";
    setCarList((prev) =>
      prev.map((car) =>
        car.id === e.target.name ? { ...car, vote, action } : { ...car }
      )
    );
  };

  // CONVERT DRIFT TO %
  function driftToPercentage(drift) {
    return (drift * 100) / props.wallet.frozen;
  }
  function percentageTodrift(percentage) {
    return (props.wallet.frozen * percentage) / 100;
  }

  // RENDER CARDS
  const renderVoteCarCardsCategory =
    carList.length > 0 &&
    carList.map(
      (car) => (
        <div key={car.title}>
          <StyledVoteCard>
            <div>
              <h4>{car.title}</h4>
              <h4>
                <PersonIcon />
                {car.owner}
              </h4>
              <h3>{car.vote} DRIFT</h3>
            </div>
            <img alt="" src={apiURL + "/" + car.image} />
          </StyledVoteCard>
          <StyledSlider>
            <Slider
              name={car.id}
              value={driftToPercentage(car.vote)}
              min={0}
              max={100}
              onChange={handleVoteUpdateMUI}
              // color="green"
              sx={{ marginRight: "20px" }}
            />
            {/* <input
              type="range"
              id={car.id}
              value={driftToPercentage(car.vote)}
              min={0}
              max={100}
              onChange={(e) => handleVoteUpdate(e)}
              size={100}
            /> */}
            <span>{driftToPercentage(car.vote)}%</span>
          </StyledSlider>
        </div>
      )
      // console.log(car.id)
    );

  // HANDLE VOTE
  const handleVote = async () => {
    console.log("Voting...");
    const categoryId = props.category.id;
    for (let i = 0; i < carList.length; i++) {
      const carId = carList[i].id;
      const votingTokens = carList[i].vote;
      if (carList[i].action === "create" && votingTokens > 0) {
        console.log("Post...");
        await postCarVote({
          walletId,
          carId,
          categoryId,
          votingTokens,
        });
      }
      if (carList[i].action === "update") {
        if (votingTokens > 0) {
          console.log("Update...");
          await updateCarVote({
            voteId: props.votes.find(
              (vote) => vote.carId === carId && vote.categoryId === categoryId
            ).id,
            votingTokens,
          });
        } else {
          console.log("Delete...");
          await deleteCarVote(
            props.votes.find(
              (vote) => vote.carId === carId && vote.categoryId === categoryId
            ).id
          );
        }
      }
      console.log("Voting changes saved...");
      props.handleClose();
      // if (carList[i].action === "delete") {

      // }
    }
  };
  return (
    <StyledContainer>
      <StyledTitle>Voting details</StyledTitle>
      <StyledTopInfo>
        {props.category && (
          <div>
            <h4>Category</h4>
            <img
              alt={props.category.category}
              src={apiURL + "/" + props.category.icon}
              width="25px"
            />
            <p>{props.category.title}</p>
          </div>
        )}
        <div>
          <h4>Tokens</h4>
          <p>{props.wallet.frozen} DRIFT</p>
        </div>
      </StyledTopInfo>
      <>{renderVoteCarCardsCategory}</>
      <StyledButtons>
        <div onClick={() => handleVote()}>VOTE</div>
        <div onClick={() => props.handleClose()}>Cancel</div>
      </StyledButtons>
    </StyledContainer>
  );
}
