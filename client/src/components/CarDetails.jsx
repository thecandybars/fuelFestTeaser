import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCarById } from "../services/car";
import { postCarVote } from "../services/vote";
import { getUser } from "../services/user";
import { getWallet } from "../services/wallet";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { walletId } from "../common/getLoginData";
import { icons } from "../common/icons";
import { useParams } from "react-router-dom";
import MainContainer from "../assets/MainContainer";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter } from "../iconComponents";
import {
  UpEngine,
  UpBody,
  UpSuspension,
  UpNitro,
  UpBrakes,
  UpTires,
  UpLights,
  UpStereo,
  UpOther,
} from "../iconComponents";
import camelCase from "../common/camelCase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// STYLED COMPONENTS
const CarDetailsContainer = styled.div`
  position: relative;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
`;
const CarInfoContainer = styled.div`
  padding: 5px 10px;
`;
const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;
const Subtitle = styled.h3`
  margin: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-family: "Oswald";
`;
const FlexLine = styled.div`
  display: flex;
  justify-content: flex-start;
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
  background-color: pink;
  margin: 3px;
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
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
const UpLabel = styled.p`
  font-size: 1rem;
`;
const UpIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 8px;
`;
const CollapseButton = styled.div`
  font-size: 1rem;
  margin-left: 20px;
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
const socialIconStyle = {
  fontSize: "2rem",
  marginRight: "5px",
};

export default function CarDetails(props) {
  const [carDetails, setCarDetails] = useState({});
  console.log(
    "🚀 ~ file: CarDetails.jsx ~ line 162 ~ CarDetails ~ carDetails",
    carDetails
  );
  const [carImages, setCarImages] = useState([]);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});
  const apiURL = process.env.REACT_APP_API;
  const { carId } = useParams();
  const navigate = useNavigate();

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

  // DISPLAY UPGRADES DETAILS
  const [displayUpgrades, setDisplayUpgrades] = useState(false);
  const handleDisplayUpgrades = () => setDisplayUpgrades((prev) => !prev);
  const upgrades = [
    {
      field: "engine",
      icon: <UpEngine />,
    },
    {
      field: "body",
      icon: <UpBody />,
    },
    {
      field: "suspension",
      icon: <UpSuspension />,
    },
    {
      field: "nitro",
      icon: <UpNitro />,
    },
    {
      field: "brakes",
      icon: <UpBrakes />,
    },
    {
      field: "tires",
      icon: <UpTires />,
    },
    {
      field: "lights",
      icon: <UpLights />,
    },
    {
      field: "stereo",
      icon: <UpStereo />,
    },
    {
      field: "other",
      icon: <UpOther />,
    },
  ];
  const renderCarUpgradeList = upgrades.map(
    (upgrade) =>
      carDetails[upgrade.field] !== "" && (
        <UpIcon key={upgrade.field}>{upgrade.icon}</UpIcon>
      )
  );
  const renderCarUpgradeDetails = upgrades.map(
    (upgrade) =>
      carDetails[upgrade.field] !== "" && (
        <div style={{ marginTop: "10px" }}>
          <FlexLine>
            <UpIcon key={upgrade.field}>{upgrade.icon}</UpIcon>
            <h2>
              {upgrade.field[0].toUpperCase()}
              {upgrade.field.slice(1)}
            </h2>
          </FlexLine>
          <p style={{ marginLeft: "10px" }}>{carDetails[upgrade.field]}</p>
        </div>
      )
  );
  const renderCarUpgrade = (
    <>
      <Subtitle>Upgrades</Subtitle>

      <FlexLine>
        {renderCarUpgradeList}
        <CollapseButton onClick={handleDisplayUpgrades}>Details</CollapseButton>
      </FlexLine>
      <Collapse in={displayUpgrades} timeout="auto" unmountOnExit>
        <div style={{ marginLeft: "10px" }}>{renderCarUpgradeDetails}</div>
      </Collapse>
    </>
  );

  // RENDER CARS SPONSORS LIST
  const renderCarSponsorList = [];
  // const renderCarSponsorList =
  //   carDetails.sponsors &&
  //   carDetails.sponsors.map((sponsor) => (
  //     <FlexWrap key={sponsor.id}>
  //       <SponsorLogo alt="" src={`${apiURL}/${sponsor.logo}`} />
  //       <SponsorTitle>{sponsor.title}</SponsorTitle>
  //     </FlexWrap>
  //   ));
  const otherSponsors =
    carDetails.otherSponsors && carDetails.otherSponsors.split(",");
  const renderCarOtherSponsorList =
    carDetails.otherSponsors &&
    otherSponsors.map((sponsor) => (
      // console.log(sponsor)
      <FlexColumn key={sponsor}>
        <OtherSponsorAvatar>{sponsor[0].toUpperCase()}</OtherSponsorAvatar>
        <SponsorTitle>{sponsor}</SponsorTitle>
      </FlexColumn>
    ));
  //RENDER CAR VOTE CATEGORIES LIST
  const renderCarVoteCategories =
    carDetails.voteCategories &&
    carDetails.voteCategories.map((category) => (
      <VoteBlock key={category.id}>
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

  return (
    Object.keys(carDetails).length !== 0 &&
    Object.keys(wallet).length !== 0 && (
      <MainContainer>
        <CarDetailsContainer>
          <Button
            color="red"
            onClick={() => navigate(-1)}
            variant="contained"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              zIndex: "100",
            }}
          >
            <CloseIcon />
          </Button>
          <div onClick={(e) => e.stopPropagation()}>
            <ImageGallery
              items={carImages}
              showBullets={false}
              showIndex={false}
              showThumbnails={false}
              lazyLoad={true}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>
          {carDetails && (
            <CarInfoContainer>
              {/* TITLE */}

              <Title>{carDetails.title}</Title>
              {/* OWNER */}
              <FlexLine>
                <SmallIcon src={icons.owner} />
                {carDetails.carOwner.name}
              </FlexLine>
              {/* SOCIAL */}
              <FlexLine>
                {carDetails.carOwner.instagram && (
                  <Instagram style={{ ...socialIconStyle }} />
                )}
                {carDetails.carOwner.facebook && (
                  <Facebook style={{ ...socialIconStyle }} />
                )}
                {carDetails.carOwner.youtube && (
                  <Youtube style={{ ...socialIconStyle }} />
                )}
                {carDetails.carOwner.twitter && (
                  <Twitter style={{ ...socialIconStyle }} />
                )}
              </FlexLine>
              {/* CAR DESCRIPTION */}
              <CarDescrption>{carDetails.description}</CarDescrption>

              {/* CAR UPGRADES */}
              {!!renderCarUpgradeList && <>{renderCarUpgrade}</>}

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

              {/* CAR VOTING */}
              {!!renderCarVoteCategoriesBlock && renderCarVoteCategoriesBlock}
              {/* CAR BUY */}
              {!!renderCarBuy && renderCarBuy}
            </CarInfoContainer>
          )}
        </CarDetailsContainer>
      </MainContainer>
    )
  );
}
