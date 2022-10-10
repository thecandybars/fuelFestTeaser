import React, { useEffect, useState } from "react";
import SponsorCard from "./SponsorCard";
import {
  getSponsors,
  getFavSponsor,
  toggleFavSponsor,
} from "../../services/sponsor";
import Title from "../../components/_shared/Title";
import MainContainer from "../_shared/MainContainer";
import CardsContainerColumn from "../_shared/CardsContainerColumn";

export default function Sponsors() {
  const [fetchedSponsors, setFetchedSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  //INIT
  useEffect(() => {
    fetchSponsors();
    fetchFavorites();
  }, []);
  const fetchSponsors = async () => {
    const sponsors = await getSponsors();
    setFetchedSponsors(sponsors);
    setFilteredSponsors(sponsors);
  };
  // FAVORITES
  const [fetchedFavs, setFetchedFavs] = useState([]);
  const fetchFavorites = async () => {
    const favs = await getFavSponsor();
    setFetchedFavs(favs);
  };
  async function toggleFav(sponsorId) {
    console.log(
      "🚀 ~ file: index.jsx ~ line 32 ~ toggleFav ~ sponsorId",
      sponsorId
    );
    await toggleFavSponsor(sponsorId);
    fetchFavorites();
  }
  const [sponsorShowingDesc, setSponsorShowingDesc] = useState("");
  async function handleShowDesc(sponsorId) {
    sponsorShowingDesc !== sponsorId
      ? setSponsorShowingDesc(sponsorId)
      : setSponsorShowingDesc("");
  }
  // RENDER SPONSOR CARDS
  const RenderSponsorCards =
    filteredSponsors.length > 0 ? (
      filteredSponsors.map((sponsor) => (
        <SponsorCard
          data={sponsor}
          key={sponsor.id}
          isFavorite={
            !!fetchedFavs.find((favSponsor) => sponsor.id === favSponsor.id)
          }
          toggleFav={toggleFav}
          showDesc={handleShowDesc}
        />
      ))
    ) : (
      <p>No sponsors to show</p>
    );

  // ************ FILTERS
  const [search, setSearch] = useState("");
  useEffect(() => {
    setFilteredSponsors(
      fetchedSponsors.filter((sponsor) =>
        search !== ""
          ? sponsor.title.toLowerCase().includes(search.toLowerCase()) ||
            sponsor.descriptionShort
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            sponsor.descriptionLong.toLowerCase().includes(search.toLowerCase())
          : true
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, fetchedSponsors, fetchedFavs]);

  return (
    <MainContainer>
      <Title backButton="true">SPONSORS</Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          size="15"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CardsContainerColumn>{RenderSponsorCards}</CardsContainerColumn>
    </MainContainer>
  );
}
