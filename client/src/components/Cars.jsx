import React, { useEffect, useState } from "react";

import { getCars, postFavCar, getFavCar } from "../services/car";

import CarCard from "./CarCard";
import style from "./css/Cars.module.css";
import CarDetails from "./CarDetails";

export default function Cars() {
  const [fetchedCars, setFetchedCars] = useState([]);
  console.log(
    "🚀 ~ file: Cars.jsx ~ line 11 ~ Cars ~ fetchedCars",
    fetchedCars
  );
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

  const RenderCarCards =
    filteredCars.length > 0 ? (
      filteredCars.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          title={car.title}
          image={!!car.carImages.length && car.carImages[0].image}
          owner={car.carOwner.name}
          voting={car.voteCategories}
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

  //// FILTER INPUTS
  const RenderInputManufacturer = fetchedCars
    .map((car) => car.manufacturer)
    .filter((item, index, arr) => arr.indexOf(item) === index) // filtra repeticiones);
    .map((manufacturer) => (
      <option value={manufacturer}>{manufacturer}</option>
    ));
  const RenderInputTire = fetchedCars
    .map((car) => car.tireManufacturer)
    .filter((item, index, arr) => arr.indexOf(item) === index) // filtra repeticiones);
    .map((tireManufacturer) => (
      <option value={tireManufacturer}>{tireManufacturer}</option>
    ));
  //// FILTER STATE
  const [filterManufacturer, setFilterManufacturer] = useState("all");
  const [filterTire, setFilterTire] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  ///FILTER ACTION
  useEffect(() => {
    // .filter((car) => car.tireManufacturer === filterTire);
    setFilteredCars(
      fetchedCars.filter(
        (car) =>
          (filterManufacturer !== "all"
            ? car.manufacturer === filterManufacturer
            : true) &&
          (filterTire !== "all" ? car.tireManufacturer === filterTire : true) &&
          (filterSearch !== ""
            ? car.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
              car.description.toLowerCase().includes(filterSearch.toLowerCase())
            : true)
      )
    );
  }, [filterManufacturer, filterTire, filterSearch]);

  return (
    <div className={style.container}>
      {carDetails && carDetails}
      <h1 className={style.title}>Cars</h1>
      <nav className={style.cars_nav}>
        <select
          name="filterManufacturer"
          onChange={(e) => setFilterManufacturer(e.target.value)}
        >
          <option value="all">All manufacturers</option>
          {RenderInputManufacturer}
        </select>
        <select
          name="filterTire"
          onChange={(e) => setFilterTire(e.target.value)}
        >
          <option value="all">All tires</option>
          {RenderInputTire}
        </select>
        <input
          type="text"
          size="15"
          onChange={(e) => setFilterSearch(e.target.value)}
          placeholder="search"
        />
      </nav>
      <main>{RenderCarCards}</main>
    </div>
  );
}
