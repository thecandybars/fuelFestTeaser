import React, { useEffect, useState } from "react";
import style from "./css/CarDetails.module.css";
import PhotoSlider from "./PhotoSlider";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
import { getCarById } from "../common/actions";

export default function CarDetails(props) {
  const [carDetails, setCarDetails] = useState({});
  const [carImages, setCarImages] = useState([]);
  const [carSponsors, setCarSponsors] = useState([]);
  useEffect(() => {
    fetchCarDetails();
  }, []);
  const fetchCarDetails = async () => {
    const carDetails = await getCarById(props.id);
    setCarDetails(carDetails);
    setCarImages(carDetails.carImages.map((carImage) => carImage.image));
    setCarSponsors(carDetails.sponsors.map((carSponsor) => carSponsor.title));
  };
  return (
    <div
      className={style.carDetail_wholeScreen}
      onClick={() => {
        props.showDetails("");
      }}
    >
      <div className={style.carDetail_container}>
        <button className={style.carDetail_close}>X</button>
        <PhotoSlider images={carImages} />
        {carDetails && (
          <div className={style.carDetail_info}>
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
            <div className={style.carDescription}>
              <h3>Details</h3>
              <p>{carDetails.description}</p>
            </div>
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
            {!!carSponsors.length && (
              <div className={style.carSponsors}>
                <h3>Sponsors</h3>
                <p>{carSponsors.toString()}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
