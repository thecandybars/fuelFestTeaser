import React, { useEffect, useState } from "react";
import { getCars, postFavCar, getFavCar } from "../services/car";
import CarCard from "./CarCard";
import style from "./css/Cars.module.css";
import Title from "../assets/Title";
import MainContainer from "../assets/MainContainer";

export default function Cars() {
  const [fetchedCars, setFetchedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [, setFetchedFavs] = useState([]);
  const [carDetails] = useState("");

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

  ///FILTER SEARCH FIELD
  const [filterSearch, setFilterSearch] = useState("");
  useEffect(() => {
    const searchString = filterSearch.toLowerCase();
    setFilteredCars(
      fetchedCars.filter((car) =>
        filterSearch !== ""
          ? car.title.toLowerCase().includes(searchString) ||
            car.description.toLowerCase().includes(searchString) ||
            car.year.toString().includes(searchString) ||
            car.engine.toLowerCase().includes(searchString) ||
            car.body.toLowerCase().includes(searchString) ||
            car.suspension.toLowerCase().includes(searchString) ||
            car.nitro.toLowerCase().includes(searchString) ||
            car.brakes.toLowerCase().includes(searchString) ||
            car.tires.toLowerCase().includes(searchString) ||
            car.lights.toLowerCase().includes(searchString) ||
            car.stereo.toLowerCase().includes(searchString) ||
            car.others.toLowerCase().includes(searchString)
          : true
      )
    );
  }, [filterSearch, fetchedCars]);

  // RENDER CAR CARDS
  const RenderCarCards =
    filteredCars.length > 0 ? (
      filteredCars.map((car) => (
        <CarCard car={car} key={car.id} togFav={toggleFav} />
      ))
    ) : (
      <p>No cars to show</p>
    );

  return (
    <MainContainer>
      <div className={style.container}>
        {carDetails && carDetails}
        <Title backButton="true">CARS</Title>
        <nav className={style.cars_nav}>
          <input
            type="text"
            size="45"
            onChange={(e) => setFilterSearch(e.target.value)}
            placeholder="search"
          />
        </nav>
        {RenderCarCards}
      </div>
    </MainContainer>
  );
}
