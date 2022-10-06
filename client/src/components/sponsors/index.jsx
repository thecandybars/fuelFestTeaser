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
  console.log(
    "🚀 ~ file: index.jsx ~ line 14 ~ Sponsors ~ fetchedSponsors",
    fetchedSponsors
  );
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [fetchedFavs, setFetchedFavs] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx ~ line 20 ~ Sponsors ~ fetchedFavs",
    fetchedFavs
  );

  useEffect(() => {
    fetchSponsors();
    fetchFavorites();
  }, []);
  const fetchSponsors = async () => {
    const sponsors = await getSponsors();
    setFetchedSponsors(sponsors);
    setFilteredSponsors(sponsors);
  };
  const fetchFavorites = async () => {
    const favs = await getFavSponsor();
    setFetchedFavs(favs);
  };

  const [sponsorShowingDesc, setSponsorShowingDesc] = useState("");
  const today = Date.now();

  async function toggleFav(sponsorId) {
    await toggleFavSponsor(sponsorId);
    fetchFavorites();
  }
  async function handleShowDesc(sponsorId) {
    sponsorShowingDesc !== sponsorId
      ? setSponsorShowingDesc(sponsorId)
      : setSponsorShowingDesc("");
  }
  // RENDER EVENT CARDS
  //   const RenderSponsorCards = [];
  const RenderSponsorCards =
    filteredSponsors.length > 0 ? (
      filteredSponsors.map((sponsor) => (
        <SponsorCard
          data={sponsor}
          key={sponsor.id}
          isFavorite={
            !!fetchedFavs.find((favSponsor) => sponsor.id === favSponsor.id)
          }
          togFav={toggleFav}
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
