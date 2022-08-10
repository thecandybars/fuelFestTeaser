import React, { useEffect, useState } from "react";

import { getCars, postFavCar, getFavCar } from "../common/actions";

import CarCard from "./CarCard";
import style from "./css/Cars.module.css";
import CarDetails from "./CarDetails";

export default function Cars() {
  const [fetchedCars, setFetchedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [fetchedFavs, setFetchedFavs] = useState([]);

  const [carDetails, setCarDetails] = useState("");

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
    const favs = await getFavCar("ddf40198-fc6c-4595-95cc-bda6d77fffaa");
    setFetchedFavs(favs);
  };
  async function toggleFav(carId) {
    await postFavCar("ddf40198-fc6c-4595-95cc-bda6d77fffaa", carId);
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
          // id={selectedCar.id}
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
          image={car.carImages[0].image}
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
        <input type="text" size="15" />
        <input type="text" size="15" />
      </nav>
      <main>{carCards}</main>
    </div>
  );
}
