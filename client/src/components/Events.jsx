import React, { useEffect, useState } from "react";

import EventCard from "./EventCard";
import style from "./css/Events.module.css";
import { getEvents, getFavEvent, toggleFavEvent } from "../services/event";
import Title from "../assets/Title";

export default function Events() {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [fetchedFavs, setFetchedFavs] = useState([]);

  const [eventShowingDesc, setEventShowingDesc] = useState("");

  const today = Date.now();

  async function toggleFav(eventId) {
    await toggleFavEvent(eventId);
    fetchFavorites();
  }
  async function handleShowDesc(eventId) {
    eventShowingDesc !== eventId
      ? setEventShowingDesc(eventId)
      : setEventShowingDesc("");
  }

  const eventCards =
    filteredEvents.length > 0 ? (
      filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          image={event.image}
          location={event.location}
          desc={eventShowingDesc === event.id ? event.description : ""}
          isFavorite={
            !!fetchedFavs.find((favEvent) => event.id === favEvent.id)
          }
          togFav={toggleFav}
          showDesc={handleShowDesc}
        />
      ))
    ) : (
      <p>No events to show</p>
    );

  useEffect(() => {
    fetchEvents();
    fetchFavorites();
  }, []);
  const fetchEvents = async () => {
    const events = await getEvents();
    setFetchedEvents(events);
    setFilteredEvents(events);
  };
  const fetchFavorites = async () => {
    const favs = await getFavEvent();
    setFetchedFavs(favs);
  };

  // ************ FILTERS
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [date_time, setDate_time] = useState("all");
  useEffect(() => {
    setFilteredEvents(
      fetchedEvents.filter(
        (event) =>
          (category !== "all"
            ? category !== "liked"
              ? event.category === category
              : !!fetchedFavs.find((favEvent) => favEvent.id === event.id)
            : true) &&
          (date_time !== "all"
            ? date_time === "upcoming"
              ? Date.parse(event.date) > today
              : Date.parse(event.date) < today
            : true) &&
          (search !== ""
            ? event.title.toLowerCase().includes(search.toLowerCase())
            : true)
      )
    );
  }, [search, category, date_time]);

  return (
    <div className={style.container}>
      <Title title="Events" backButton="true"></Title>
      <nav className={style.events_nav}>
        <select name="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          <option value="drifting">Drifting</option>
          <option value="guest">Guest</option>
          <option value="music">Music</option>
          <option value="liked">Liked</option>
        </select>
        <select name="date_time" onChange={(e) => setDate_time(e.target.value)}>
          <option value="all">All dates</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <input
          type="text"
          size="15"
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>
      <main>{eventCards}</main>
    </div>
  );
}
