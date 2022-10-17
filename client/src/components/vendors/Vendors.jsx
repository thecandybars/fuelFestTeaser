import React, { useEffect, useState } from "react";
import VendorCard from "./VendorCard";
import {
  getVendors,
  getFavVendor,
  toggleFavVendor,
} from "../../services/vendor";
import Title from "../../components/_shared/Title";
import MainContainer from "../_shared/MainContainer";
import CardsContainerColumn from "../_shared/CardsContainerColumn";

export default function Vendors() {
  const [fetchedVendors, setFetchedVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  //INIT
  useEffect(() => {
    fetchVendors();
    fetchFavorites();
  }, []);
  const fetchVendors = async () => {
    const vendors = await getVendors();
    vendors.sort(function (a, b) {
      const A = a.isSponsor;
      const B = b.isSponsor;
      if (A > B) return -1;
      if (A < B) return 1;
      return 0;
    });
    setFetchedVendors(vendors);
    setFilteredVendors(vendors);
  };
  // FAVORITES
  const [fetchedFavs, setFetchedFavs] = useState([]);
  const fetchFavorites = async () => {
    const favs = await getFavVendor();
    setFetchedFavs(favs);
  };
  async function toggleFav(vendorId) {
    await toggleFavVendor(vendorId);
    fetchFavorites();
  }
  const [vendorShowingDesc, setVendorShowingDesc] = useState("");
  async function handleShowDesc(vendorId) {
    vendorShowingDesc !== vendorId
      ? setVendorShowingDesc(vendorId)
      : setVendorShowingDesc("");
  }
  // RENDER SPONSOR CARDS
  // const RenderVendorCards = [];
  const RenderVendorCards =
    filteredVendors.length > 0 ? (
      filteredVendors.map((vendor) => (
        <VendorCard
          data={vendor}
          key={vendor.id}
          isFavorite={
            !!fetchedFavs.find((favVendor) => vendor.id === favVendor.id)
          }
          toggleFav={toggleFav}
          showDesc={handleShowDesc}
        />
      ))
    ) : (
      <p>No vendors to show</p>
    );

  // ************ FILTERS
  const [search, setSearch] = useState("");
  useEffect(() => {
    setFilteredVendors(
      fetchedVendors.filter((vendor) =>
        search !== ""
          ? vendor.title.toLowerCase().includes(search.toLowerCase()) ||
            vendor.descriptionShort
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            vendor.descriptionLong.toLowerCase().includes(search.toLowerCase())
          : true
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, fetchedVendors, fetchedFavs]);

  return (
    <MainContainer>
      <Title backButton="true">VENDORS</Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          size="15"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CardsContainerColumn>{RenderVendorCards}</CardsContainerColumn>
    </MainContainer>
  );
}
