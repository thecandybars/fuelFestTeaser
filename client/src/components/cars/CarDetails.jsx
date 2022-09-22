import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCarById } from "../../services/car";
// import { postCarVote } from "../services/vote";
import { getUser } from "../../services/user";
import { getWallet } from "../../services/wallet";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { walletId } from "../../common/getLoginData";
import { icons } from "../../common/icons";
import { useParams } from "react-router-dom";
import MainContainerWhole from "../_shared/MainContainerWhole";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Owner,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "../../iconComponents";
import {
  UpEngine,
  UpBody,
  UpSuspension,
  UpNitro,
  UpBrakes,
  UpTires,
  UpLights,
  UpStereo,
  UpOthers,
} from "../../iconComponents";
import camelCase from "../../common/camelCase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// STYLED COMPONENTS
const CarDetailsContainer = styled.div`
  position: relative;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  font-family: "Nunito", sans-serif;
  font-weight: light;
`;
const CarInfoContainer = styled.div`
  padding: 5px 10px;
`;
const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 10px;
  font-family: "Oswald", sans-serif;
`;
const Subtitle = styled.h3`
  margin: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-family: "Oswald", sans-serif;
`;
const FlexLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  /* font-family: "Roboto"; */
`;
const DetailsCategory = styled.div`
  margin-top: 15px;
`;
const UpgradeDetails = styled.div`
  margin-top: 10px;
  div {
    display: flex;
    align-items: stretch;
  }
  h2 {
    font-family: "Roboto";
    font-size: 1.2rem;
    font-weight: bolder;
  }
  p {
    margin-left: 10px;
  }
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
    font-family: "Oswald", sans-serif;
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
const UpIcon = styled.div`
  font-size: 1.8rem;
  margin-right: 10px;
`;
const CollapseButton = styled.div`
  font-size: 1rem;
  margin-left: 20px;
`;
const VoteTitle = styled.div`
  text-align: center;
  /* max-width: 80px; */
  font-family: "Oswald", sans-serif;
  font-size: 0.75rem;
  color: ${(props) => props.theme.white};
`;
// LINE
const Line = styled.hr`
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-width: 1px;
  color: ${(props) => props.theme.darkWhite};
`;
//SPONSORS
const Sponsor = styled.div`
  margin-right: 8px;
  max-width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;
  overflow-wrap: break-word;
`;
const SponsorLogo = styled.img`
  height: 35px;
  padding-right: 10px;
  background-blend-mode: multiply;
`;
const OtherSponsorAvatar = styled.div`
  text-align: center;
  margin-bottom: 5px;
  padding: 2px;
  height: 25px;
  width: 25px;
  border: 1px solid black;
  background-color: black;
  color: ${(props) => props.theme.white};
  font-weight: bolder;
  border-radius: 100px;
`;
const SponsorTitle = styled.p`
  max-width: 70px;
  font-size: 0.8rem;
  text-align: center;
`;
///
const BuyBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CarPrice = styled.div`
  h3 {
    color: ${(props) => props.theme.green};
    font-family: "Oswald", sans-serif;
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
  font-family: "Oswald", sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;
const socialIconStyle = {
  fontSize: "2rem",
  marginRight: "5px",
};

export default function CarDetails(props) {
  const [carDetails, setCarDetails] = useState({});
  const [carImages, setCarImages] = useState([]);
  const [, setUser] = useState({});
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
  // async function handleVote(categoryId) {
  //   await postCarVote({
  //     walletId: user.walletId,
  //     carId: carDetails.id,
  //     categoryId,
  //     votingTokens: user.wallet.frozen,
  //   });
  //   fetchWallet();
  // }

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
      field: "others",
      icon: <UpOthers />,
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
        <UpgradeDetails key={upgrade.field}>
          <div>
            <UpIcon>{upgrade.icon}</UpIcon>
            <h2>
              {upgrade.field[0].toUpperCase()}
              {upgrade.field.slice(1)}
            </h2>
          </div>
          <p>{carDetails[upgrade.field]}</p>
        </UpgradeDetails>
      )
  );
  const renderCarUpgrade = (
    <>
      <FlexLine onClick={handleDisplayUpgrades}>
        <Subtitle>Upgrades</Subtitle>
        <CollapseButton>
          <ExpandMoreIcon
            style={{
              transform: !displayUpgrades ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </CollapseButton>
      </FlexLine>
      <Collapse in={!displayUpgrades} timeout="auto" unmountOnExit>
        <FlexLine>{renderCarUpgradeList}</FlexLine>
      </Collapse>
      <Collapse in={displayUpgrades} timeout="auto" unmountOnExit>
        <div style={{ margin: "0 10px" }}>{renderCarUpgradeDetails}</div>
      </Collapse>
    </>
  );

  // RENDER CARS SPONSORS LIST
  const renderCarSponsorList =
    carDetails.sponsors &&
    carDetails.sponsors.map((sponsor) =>
      !!sponsor.logo ? (
        <Sponsor key={sponsor.id}>
          <SponsorLogo alt={sponsor.title} src={`${apiURL}/${sponsor.logo}`} />
          <SponsorTitle>{sponsor.title}</SponsorTitle>
        </Sponsor>
      ) : (
        <Sponsor key={sponsor.id}>
          <OtherSponsorAvatar>
            {sponsor.title[0].toUpperCase()}
          </OtherSponsorAvatar>
          <SponsorTitle>{sponsor.title}</SponsorTitle>
        </Sponsor>
      )
    );
  const otherSponsors =
    carDetails.otherSponsors && carDetails.otherSponsors.split(",");
  const renderCarOtherSponsorList =
    carDetails.otherSponsors &&
    otherSponsors.map((sponsor) => (
      <Sponsor key={sponsor}>
        <OtherSponsorAvatar>{sponsor[0].toUpperCase()}</OtherSponsorAvatar>
        <SponsorTitle>{sponsor}</SponsorTitle>
      </Sponsor>
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
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const renderCarBuy = carDetails && (
    <BuyBox>
      <CarPrice>
        <h3>Sell Price: {currency.format(carDetails.price)}</h3>
        <p>Make an offer</p>
      </CarPrice>
      <BuyButton>BUY</BuyButton>
    </BuyBox>
  );

  return (
    Object.keys(carDetails).length !== 0 &&
    Object.keys(wallet).length !== 0 && (
      <MainContainerWhole>
        <CarDetailsContainer>
          {/* <Button
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
          </Button> */}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title>
                  {carDetails.year && carDetails.year + " "}
                  {carDetails.title}
                </Title>
                <Button
                  onClick={() => navigate(-1)}
                  variant="outlined"
                  color="darkGray"
                >
                  <CloseIcon />
                </Button>
              </div>
              {/* OWNER */}
              <DetailsCategory>
                <FlexLine style={{ alignItems: "baseline" }}>
                  <Owner style={{ fontSize: "1.5rem" }} />
                  <p>{carDetails.carOwner.name}</p>
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
              </DetailsCategory>

              {/* CAR DESCRIPTION */}
              <DetailsCategory>
                <p>{carDetails.description}</p>
              </DetailsCategory>

              {/* CAR UPGRADES */}
              {!!renderCarUpgradeList && (
                <DetailsCategory>{renderCarUpgrade}</DetailsCategory>
              )}

              <Line />

              {/* CAR SPONSORS */}
              {(!!renderCarSponsorList || !!renderCarOtherSponsorList) && (
                <DetailsCategory>
                  <Subtitle>Sponsors</Subtitle>
                  <FlexLine style={{ alignItems: "flex-start" }}>
                    {renderCarSponsorList}
                    {renderCarOtherSponsorList}
                  </FlexLine>
                </DetailsCategory>
              )}

              {/* CAR VOTING */}
              {!!renderCarVoteCategoriesBlock && renderCarVoteCategoriesBlock}

              {/* CAR BUY */}
              {!!renderCarBuy && renderCarBuy}
            </CarInfoContainer>
          )}
        </CarDetailsContainer>
      </MainContainerWhole>
    )
  );
}
