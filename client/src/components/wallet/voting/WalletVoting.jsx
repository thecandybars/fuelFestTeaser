import React, { useEffect, useState } from "react";
import MainContainer from "../../_shared/MainContainer";
import Title from "../../../components/_shared/Title";
import bestLights from "../../../img/best-lights.jpg";
import bestInterior from "../../../img/best-interior.jpg";
import bestPaint from "../../../img/best-paint.jpg";
import bestRims from "../../../img/best-rims.jpg";
import bestStereo from "../../../img/best-stereo.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCars, getFavCar, postFavCar } from "../../../services/car";
import VoteCarCardMain from "./VoteCarCardMain";
import { walletId } from "../../../common/getLoginData";
import { getWallet } from "../../../services/wallet";
import { getAllVoteCategories, postCarVote } from "../../../services/vote";
import { Dialog, InputLabel, MenuItem, Select } from "@mui/material";
import VoteCategory from "./VoteCategory";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 80%; */
`;

export default function WalletVoting() {
  const [fetchedCars, setFetchedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [fetchedFavs, setFetchedFavs] = useState([]);
  const [walletVotes, setWalletVotes] = useState({});
  const [voteCategories, setVoteCategories] = useState([]);

  useEffect(() => {
    fetchCars();
    fetchFavorites();
    fetchWalletVotes();
    fetchVoteCategories();
  }, []);
  const fetchCars = async () => {
    const cars = await getCars();
    setFetchedCars(cars);
    setFilteredCars(cars);
  };
  const fetchFavorites = async () => {
    const favs = await getFavCar();
    setFetchedFavs(favs);
  };
  const fetchWalletVotes = async () => {
    console.log("Fetching wallet...");
    const wallet = await getWallet(walletId);
    setWalletVotes(wallet);
  };
  const fetchVoteCategories = async () => {
    const categories = await getAllVoteCategories();
    setVoteCategories(categories);
  };

  async function toggleFav(carId) {
    await postFavCar(carId);
    fetchFavorites();
  }
  // DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = async () => {
    setOpenDialog(false);
    await fetchWalletVotes();
  };

  // CAR VOTE
  const [clickedVote, setClickedVote] = useState({
    categoryId: "",
    carId: "",
    title: "",
    owner: "",
    image: "",
  });

  // RENDER CATEGORY VOTES FOR WALLET
  const [renderDialogVotes, setRenderDialogVotes] = useState([]);
  useEffect(() => {
    setRenderDialogVotes(
      Object.keys(walletVotes).length > 0 && (
        <VoteCategory
          cars={fetchedCars.filter((car) =>
            walletVotes.votes
              .filter((vote) => vote.categoryId === clickedVote.categoryId)
              .map((vote) => vote.carId)
              .includes(car.id)
          )} // filters cars with votes for that particular voteCategory
          votes={walletVotes.votes.filter(
            (vote) => vote.categoryId === clickedVote.categoryId
          )} // filters votes for that particular voteCategory
          wallet={walletVotes}
          category={voteCategories.find(
            (category) => category.id === clickedVote.categoryId
          )}
          lastCarClicked={{
            ...clickedVote,
            action: walletVotes.votes.find(
              (vote) =>
                vote.categoryId === clickedVote.categoryId &&
                vote.carId === clickedVote.carId
            )
              ? null
              : "create",
          }} // action : wallet already voted for this car ? null : create
          handleClose={() => handleDialogClose()}
        />
      )
    );
  }, [clickedVote, walletVotes]);

  // HANDLE CATEGORY BUTTONS
  const handleCategoryClick = async (categoryId, carId) => {
    const title = fetchedCars.find((car) => car.id === carId).title;
    const image = fetchedCars.find((car) => car.id === carId).carImages[0]
      .image;
    const owner = fetchedCars.find((car) => car.id === carId).carOwner.name;
    setClickedVote({ categoryId, carId, title, image, owner });
    // await voteForCar(categoryId, carId);
    // await fetchWalletVotes();
    setOpenDialog(true);
  };

  // RENDER VOTE CAR CARDS
  const renderVoteCarCardsMain = filteredCars.map((car) => (
    <VoteCarCardMain
      car={car}
      key={car.id}
      handleCategoryClick={handleCategoryClick}
      votes={walletVotes.votes.filter((vote) => vote.carId === car.id) || []}
      frozenDrift={walletVotes.frozen}
    />
  ));

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose()}
        fullWidth
        maxWidth="lg"
      >
        {renderDialogVotes}
      </Dialog>
      <MainContainer>
        <Title backButton="true">VOTING</Title>
        {/* <InputLabel color="primary" id="demo-simple-select-label">
          Age
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          // onChange={}
          color="primary"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}
        <Flex>{renderVoteCarCardsMain}</Flex>
      </MainContainer>
    </>
  );
}

//  const Flex = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   align-items: center;
//   height: 80%;
// `;
// const BestImg = styled.img`
//   width: 150px;
//   border-radius: 100px;
//   border: 3px solid ${(props) => props.theme.yellow};
// `;

// <MainContainer>
//   <Title backButton="true">VOTING</Title>
//   <Flex>
//     <Link to="/wallet/voting/category/interior">
//       <BestImg alt="Best interior" src={bestInterior} />
//     </Link>
//     <Link to="/wallet/voting/category/lights">
//       <BestImg alt="Best lights" src={bestLights} />
//     </Link>
//     <Link to="/wallet/voting/category/paint">
//       <BestImg alt="Best paint" src={bestPaint} />
//     </Link>
//     <Link to="/wallet/voting/category/rims">
//       <BestImg alt="Best rims" src={bestRims} />
//     </Link>
//     <Link to="/wallet/voting/category/stereo">
//       <BestImg alt="Best stereo" src={bestStereo} />
//     </Link>
//   </Flex>
// </MainContainer>
