import React, { useEffect, useState } from "react";
import style from "./css/CarDetails.module.css";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
import { getCarById } from "../services/car";
import { postCarVote } from "../services/vote";
import { getUser } from "../services/user";
import { getWallet } from "../services/wallet";
import Button2 from "../assets/Button2";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { walletId } from "../common/getLoginData";
import socialFacebookIcon from "../icons/social/facebook.svg";
import socialInstagramIcon from "../icons/social/instagram.svg";
import socialTwitterIcon from "../icons/social/twitter.svg";
import socialYoutubeIcon from "../icons/social/youtube.svg";
import ownerIcon from "../icons/person_FILL0_wght400_GRAD0_opsz48.svg";
import Button1 from "../assets/Button1";

export default function CarDetails(props) {
  const [carDetails, setCarDetails] = useState({});
  console.log(
    "🚀 ~ file: CarDetails.jsx ~ line 21 ~ CarDetails ~ carDetails",
    carDetails
  );
  const [carImages, setCarImages] = useState([]);
  const [carSponsors, setCarSponsors] = useState([]);
  const [carVoteCategories, setCarVoteCategories] = useState([]);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});
  const apiURL = process.env.REACT_APP_API;

  useEffect(() => {
    fetchCarDetails();
    fetchUser();
    fetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCarDetails = async () => {
    const carDetails = await getCarById(props.id);
    setCarDetails(carDetails);
    setCarImages(
      carDetails.carImages.map((carImage) => ({
        original: `${apiURL}/${carImage.image}`,
      }))
    );
    setCarSponsors(carDetails.sponsors.map((carSponsor) => carSponsor.title));
    setCarVoteCategories(
      carDetails.voteCategories.map((carVoteCategory) => carVoteCategory)
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

  return (
    Object.keys(carDetails).length !== 0 &&
    Object.keys(wallet).length !== 0 && (
      <div
        className={style.carDetail_wholeScreen}
        onClick={() => {
          props.showDetails("");
        }}
      >
        <div className={style.carDetail_container}>
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
              <h2>
                {carDetails.title}
                <img
                  className={style.isFavorite}
                  alt={props.isFavorite ? "Favorite" : "Not favorite"}
                  src={props.isFavorite ? favYes : favNo}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.togFav(props.id);
                  }}
                />
              </h2>
              {/* OWNER */}
              <div className={style.owner}>
                <img
                  alt="owner icon"
                  src={ownerIcon}
                  className={`${style.smIcon} `}
                />
                {carDetails.carOwner.name}
              </div>
              <div className={style.carOwner_links}>
                {carDetails.carOwner.instagram && (
                  <img
                    alt="instagram icon"
                    src={socialInstagramIcon}
                    className={style.socialIcon}
                  />
                )}
                {carDetails.carOwner.facebook && (
                  <img
                    alt="facebook icon"
                    src={socialFacebookIcon}
                    className={style.socialIcon}
                  />
                )}
                {carDetails.carOwner.youtube && (
                  <img
                    alt="youtube icon"
                    src={socialYoutubeIcon}
                    className={style.socialIcon}
                  />
                )}
                {carDetails.carOwner.twitter && (
                  <img
                    alt="twitter icon"
                    src={socialTwitterIcon}
                    className={style.socialIcon}
                  />
                )}
              </div>
              {/* MAIN DATA WITH ICONS */}

              {/* CAR DESCRIPTION */}
              <div className={style.carDescription}>
                {/* <h3>Details</h3> */}
                <p>{carDetails.description}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* CAR UPGRADES */}
                {!!carSponsors.length && (
                  <div className={style.carSponsors}>
                    <h3>Upgrades</h3>
                    <p>{carSponsors.toString()}</p>
                  </div>
                )}
                {/* CAR SPONSORS */}
                {!!carSponsors.length && (
                  <div className={style.carSponsors}>
                    <h3>Sponsors</h3>
                    <p>{carSponsors.toString()}</p>
                  </div>
                )}
              </div>

              {/* CAR VOTING */}
              <div>
                {<Button1 title="VOTE" style={{ marginTop: "20px" }} />}
              </div>
              {
                // <div className={style.carVote}>
                //   <h3>Voting</h3>
                //   <div className={style.carVoteCategories}>
                //     {carVoteCategories.map((category) => {
                //       const canVote = !wallet.votes.find(
                //         (vote) =>
                //           vote.carId === carDetails.id &&
                //           vote.categoryId === category.id
                //       );
                //       return (
                //         <div
                //           className={style.carVoteCategory}
                //           key={category.id}
                //         >
                //           <Button2
                //             title={category.title}
                //             onClick={(e) => {
                //               e.stopPropagation();
                //               handleVote(category.id);
                //             }}
                //             disabled={!canVote}
                //           />
                //           <p>
                //             {canVote
                //               ? ""
                //               : `Vote: ${
                //                   wallet.votes.find(
                //                     (vote) =>
                //                       vote.carId === carDetails.id &&
                //                       vote.categoryId === category.id
                //                   ).votingTokens
                //                 } drift`}
                //           </p>
                //         </div>
                //       );
                //     })}
                //   </div>
                // </div>
              }
            </div>
          )}
        </div>
      </div>
    )
  );
}
