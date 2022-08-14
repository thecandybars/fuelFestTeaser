import React, { useEffect, useState } from "react";
import style from "./css/CarDetails.module.css";
import PhotoSlider from "./PhotoSlider";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
import { getCarById } from "../services/car";
import { postCarVote } from "../services/vote";
import { getUser } from "../services/user";
import { getWallet } from "../services/wallet";
import Button2 from "../assets/Button2";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function CarDetails(props) {
  const [carDetails, setCarDetails] = useState({});
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
    const wallet = await getWallet();
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
    <div
      className={style.carDetail_wholeScreen}
      onClick={() => {
        props.showDetails("");
      }}
    >
      <div className={style.carDetail_container}>
        <button className={style.carDetail_close}>X</button>
        {/* <PhotoSlider images={carImages} /> */}
        <div onClick={(e) => e.stopPropagation()}>
          <ImageGallery
            items={carImages}
            showBullets={true}
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
            {/* MAIN DATA WITH ICONS */}
            <div className={style.mainData}>
              <div>
                <span className="material-symbols-outlined">
                  directions_car
                </span>
                <p className={style.mainData_text}>{carDetails.manufacturer}</p>
              </div>
              <div>
                <span className="material-symbols-outlined">tire_repair</span>
                <p className={style.mainData_text}>
                  {carDetails.tireManufacturer}
                </p>
              </div>
              <div>
                <span className="material-symbols-outlined">location_on</span>
                <p className={style.mainData_text}>{carDetails.chasis}</p>
              </div>
            </div>
            {/* CAR DESCRIPTION */}
            <div className={style.carDescription}>
              <h3>Details</h3>
              <p>{carDetails.description}</p>
            </div>
            {/* CAR OWNER */}
            {carDetails.carOwner && (
              <div className={style.carOwner}>
                <h3>Owner</h3>
                {carDetails.carOwner.name}
                <div className={style.carOwner_links}>
                  {carDetails.carOwner.instagram && (
                    <a
                      className={style.carOwner_social}
                      href={carDetails.carOwner.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                  {carDetails.carOwner.facebook && (
                    <a
                      className={style.carOwner_social}
                      href={carDetails.carOwner.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>
                  )}
                  {carDetails.carOwner.youtube && (
                    <a
                      className={style.carOwner_social}
                      href={carDetails.carOwner.youtube}
                      target="_blank"
                      rel="noreferrer"
                    >
                      YouTube
                    </a>
                  )}
                  {carDetails.carOwner.twitter && (
                    <a
                      className={style.carOwner_social}
                      href={carDetails.carOwner.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
            {/* CAR SPONSORS */}
            {!!carSponsors.length && (
              <div className={style.carSponsors}>
                <h3>Sponsors</h3>
                <p>{carSponsors.toString()}</p>
              </div>
            )}
            {/* CAR VOTING */}
            {!!wallet && (
              <div className={style.carVote}>
                <h3>Voting</h3>
                <div className={style.carVoteCategories}>
                  {carVoteCategories.map((category) => {
                    const canVote = !wallet.votes.find(
                      (vote) =>
                        vote.carId === carDetails.id &&
                        vote.categoryId === category.id
                    );
                    return (
                      <div className={style.carVoteCategory} key={category.id}>
                        <Button2
                          title={category.title}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(category.id);
                          }}
                          disabled={!canVote}
                        />
                        <p>
                          {canVote
                            ? ""
                            : `Vote: ${
                                wallet.votes.find(
                                  (vote) =>
                                    vote.carId === carDetails.id &&
                                    vote.categoryId === category.id
                                ).votingTokens
                              } drift`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
