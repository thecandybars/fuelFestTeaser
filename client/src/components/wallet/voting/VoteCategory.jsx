import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteCarVote,
  postCarVote,
  updateCarVote,
} from "../../../services/vote";
import { walletId } from "../../../common/getLoginData";

export default function VoteCategory(props) {
  const [carList, setCarList] = useState([]);
  const [warning, setWarning] = useState([""]);

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
          <p>{car.title}</p>
          <p>{car.owner}</p>
          <p>{car.vote} drift</p>
          <input
            type="range"
            id={car.id}
            value={driftToPercentage(car.vote)}
            min={0}
            max={100}
            onChange={(e) => handleVoteUpdate(e)}
          />
          <p>{driftToPercentage(car.vote)}%</p>
          <br />
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
      // if (carList[i].action === "delete") {

      // }
    }
  };
  return (
    <div>
      <p>Frozen: {props.wallet.frozen}</p>
      <p>Category: {props.category && props.category.category}</p>
      <p style={{ color: "red" }}>{warning}</p>
      <br />
      {renderVoteCarCardsCategory}
      <button onClick={() => handleVote()}>VOTE</button>
      <button onClick={() => props.handleClose()}>Cancel</button>
    </div>
  );
}
