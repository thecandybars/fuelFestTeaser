import React, { useEffect, useState } from "react";

import { getCars, postFavCar, getFavCar } from "../services/car";

import CarCard from "./CarCard";
import style from "./css/Cars.module.css";
import CarDetails from "./CarDetails";

export default function Cars() {
  const [, setFetchedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [fetchedFavs, setFetchedFavs] = useState([]);
  const [carDetails, setCarDetails] = useState("");

  const [carFilter, setCarFilter] = useState("");
  const [voteFilter, setVoteFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    fetchCars();
    fetchFavorites();
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
  async function toggleFav(carId) {
    await postFavCar(carId);
    fetchFavorites();
  }
  async function handleShowDetails(carId) {
    if (carId === "") {
      setCarDetails("");
    } else {
      const selectedCar = filteredCars.find((car) => car.id === carId);
      setCarDetails(
        <CarDetails
          id={carId}
          isFavorite={
            !!fetchedFavs.find((favCar) => selectedCar.id === favCar.id)
          }
          showDetails={handleShowDetails}
          togFav={toggleFav}
        />
      );
    }
  }

  const carCards =
    filteredCars.length > 0 ? (
      filteredCars.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          title={car.title}
          image={!!car.carImages.length && car.carImages[0].image}
          manufacturer={car.manufacturer}
          tire={car.tireManufacturer}
          chasis={car.chasis}
          isFavorite={!!fetchedFavs.find((favCar) => car.id === favCar.id)}
          togFav={toggleFav}
          showDetails={handleShowDetails}
        />
      ))
    ) : (
      <p>No cars to show</p>
    );

  return (
    <div className={style.container}>
      {carDetails && carDetails}
      <h1 className={style.title}>Cars</h1>
      <nav className={style.cars_nav}>
        <select name="carFilter" onChange={(e) => setCarFilter(e.target.value)}>
          <option value="all">All categories</option>
          <option value="drifting">Drifting</option>
          <option value="guest">Guest</option>
          <option value="music">Music</option>
          <option value="liked">Liked</option>
        </select>
        <select
          name="voteFilter"
          onChange={(e) => setVoteFilter(e.target.value)}
        >
          <option value="all">All dates</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>

        <input
          type="text"
          size="15"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </nav>
      <main>{carCards}</main>
    </div>
  );
}
