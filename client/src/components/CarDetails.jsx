import React, { useEffect, useState } from "react";
import style from "./css/CarDetails.module.css";
import styled from "styled-components";
import { getCarById } from "../services/car";
import { postCarVote } from "../services/vote";
import { getUser } from "../services/user";
import { getWallet } from "../services/wallet";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { walletId } from "../common/getLoginData";
import Button1 from "../assets/Button1";
import { icons } from "../common/icons";
import { useParams } from "react-router-dom";
import BackButton from "../assets/BackButton";

// STYLED COMPONENTS
const CarDetailsContainer = styled.div`
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  height: 580px;
  overflow-y: scroll;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }
`;
const Subtitle = styled.h3`
  margin: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-family: "Oswald";
`;
const FlexLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const FlexColumn = styled.div`
  margin-left: 4px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;
`;
const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    margin: 5px;
  }
`;
const FlexWrap = styled.div`
  margin: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8rem;
`;
const SmallIcon = styled.img`
  height: 25px;
  padding-right: 5px;
`;
const SponsorTitle = styled.p`
  width: 50px;
  font-size: 0.7rem;
`;
const VoteBox = styled.div`
  display: flex;
  height: 80px;
  margin: 10px 0;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
  p {
    font-family: "Oswald";
    font-size: 1.7rem;
  }
  div {
    max-width: 80%;
    display: flex;
  }
`;
const VoteBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
`;
const VoteIcon = styled.img`
  height: 35px;
  padding-right: 5px;
  filter: invert(100%);
`;
const VoteTitle = styled.div`
  text-align: center;
  /* max-width: 80px; */
  font-family: "Oswald";
  font-size: 0.75rem;
  color: ${(props) => props.theme.white};
`;
const SponsorLogo = styled.img`
  height: 25px;
  padding-right: 5px;
  background-blend-mode: multiply;
`;
const OtherSponsorAvatar = styled.div`
  text-align: center;
  margin: 0;
  padding: 2px;
  height: 25px;
  width: 25px;
  border: 1px solid black;
  background-color: black;
  color: ${(props) => props.theme.white};
  font-weight: bolder;
  border-radius: 100px;
`;
const CarDescrption = styled.p`
  margin: 15px 0 0;
`;
const BuyBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CarPrice = styled.div`
  h3 {
    color: ${(props) => props.theme.green};
    font-family: "Oswald";
    font-size: 1.8rem;
  }
  p {
  }
`;
const BuyButton = styled.div`
  /* width: 30%; */
  height: fit-content;
  /* margin: 15px 0; */
  padding: 5px 35px;
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 60px;
  font-family: "Oswald";
  font-size: 1.5rem;
  text-align: center;
`;

export default function CarDetails(props) {
  const [carDetails, setCarDetails] = useState({});
  console.log(
    "🚀 ~ file: CarDetails.jsx ~ line 89 ~ CarDetails ~ carDetails",
    carDetails
  );
  const [carImages, setCarImages] = useState([]);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});
  const apiURL = process.env.REACT_APP_API;
  const { carId } = useParams();

  useEffect(() => {
    fetchCarDetails();
    fetchUser();
    fetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCarDetails = async () => {
    const carDetails = await getCarById(carId);
    setCarDetails(carDetails);
    setCarImages(
      carDetails.carImages.map((carImage) => ({
        original: `${apiURL}/${carImage.image}`,
      }))
    );
  };
  const fetchUser = async () => {
    const user = await getUser();
    setUser(user);
  };
  const fetchWallet = async () => {
    const wallet = await getWallet(walletId);
    setWallet(wallet);
  };
  async function handleVote(categoryId) {
    await postCarVote({
      walletId: user.walletId,
      carId: carDetails.id,
      categoryId,
      votingTokens: user.wallet.frozen,
    });
    fetchWallet();
  }

  // RENDER CAR UPGRADES LIST
  const upgrades = carDetails.upgrades && carDetails.upgrades.split(",");
  const renderCarUpgradeList =
    carDetails.upgrades &&
    upgrades.map((upgrade) => (
      <FlexWrap>
        <SmallIcon alt="" src={icons.upgrade[upgrade.toLowerCase()]} />
        <p>{upgrade}</p>
      </FlexWrap>
    ));
  // RENDER CARS SPONSORS LIST
  const renderCarSponsorList =
    carDetails.sponsors &&
    carDetails.sponsors.map((sponsor) => (
      <FlexWrap>
        <SponsorLogo alt="" src={`${apiURL}/${sponsor.logo}`} />
        <SponsorTitle>{sponsor.title}</SponsorTitle>
      </FlexWrap>
    ));
  const otherSponsors =
    carDetails.otherSponsors && carDetails.otherSponsors.split(",");
  const renderCarOtherSponsorList =
    carDetails.otherSponsors &&
    otherSponsors.map((sponsor) => (
      <FlexColumn>
        <OtherSponsorAvatar>{sponsor[0].toUpperCase()}</OtherSponsorAvatar>
        <SponsorTitle>{sponsor}</SponsorTitle>
      </FlexColumn>
    ));
  //RENDER CAR VOTE CATEGORIES LIST
  const renderCarVoteCategories =
    carDetails.voteCategories &&
    carDetails.voteCategories.map((category) => (
      <VoteBlock>
        <VoteIcon alt="" src={icons.voting[camelCase(category.title)]} />
        <VoteTitle>{category.title}</VoteTitle>
      </VoteBlock>
    ));
  const renderCarVoteCategoriesBlock = (
    <VoteBox>
      <p>VOTE</p>
      <div>{renderCarVoteCategories}</div>
    </VoteBox>
  );
  //RENDER CAR PRICE AND BUY
  const renderCarBuy = carDetails && (
    <BuyBox>
      <CarPrice>
        <h3>Sell Price: ${carDetails.price}</h3>
        <p>Make an offer</p>
      </CarPrice>
      <BuyButton>BUY</BuyButton>
    </BuyBox>
  );

  function camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  return (
    Object.keys(carDetails).length !== 0 &&
    Object.keys(wallet).length !== 0 && (
      <CarDetailsContainer>
        <button className={style.carDetail_close}>X</button>
        <div onClick={(e) => e.stopPropagation()}>
          <ImageGallery
            items={carImages}
            showBullets={false}
            showIndex={false}
            showThumbnails={false}
            lazyLoad={true}
            showPlayButton={false}
            showFullscreenButton={false}
            additionalClass={style.image}
          />
        </div>
        {carDetails && (
          <div className={style.carDetail_info}>
            {/* TITLE */}

            <Title>
              {/* <BackButton style={{ filter: "invert(0%)" }} /> */}
              <h2>{carDetails.title}</h2>
            </Title>
            {/* OWNER */}
            <FlexLine>
              <SmallIcon src={icons.owner} />
              {carDetails.carOwner.name}
            </FlexLine>
            {/* SOCIAL */}
            <FlexLine>
              {carDetails.carOwner.instagram && (
                <SmallIcon src={icons.social.instagram} />
              )}
              {carDetails.carOwner.facebook && (
                <SmallIcon src={icons.social.facebook} />
              )}
              {carDetails.carOwner.youtube && (
                <SmallIcon src={icons.social.youtube} />
              )}
              {carDetails.carOwner.twitter && (
                <SmallIcon src={icons.social.twitter} />
              )}
            </FlexLine>
            {/* CAR DESCRIPTION */}
            <CarDescrption>{carDetails.description}</CarDescrption>

            <TwoColumns>
              {/* CAR UPGRADES */}
              {!!renderCarUpgradeList && (
                <div>
                  <Subtitle>Upgrades</Subtitle>
                  <FlexLine>{renderCarUpgradeList}</FlexLine>
                </div>
              )}
              {/* CAR SPONSORS */}
              {!!renderCarSponsorList && (
                <div>
                  <Subtitle>Sponsors</Subtitle>
                  <FlexLine>
                    {renderCarSponsorList}
                    {renderCarOtherSponsorList}
                  </FlexLine>
                </div>
              )}
            </TwoColumns>
            {/* CAR VOTING */}
            {!!renderCarVoteCategoriesBlock &&
              false &&
              renderCarVoteCategoriesBlock}
            {/* CAR BUY */}
            {!!renderCarBuy && renderCarBuy}
          </div>
        )}
      </CarDetailsContainer>
    )
  );
}
