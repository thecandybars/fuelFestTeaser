import React, { useEffect, useState } from "react";
import axios from "axios";

import EventCard from "./EventCard";
import style from "./Events.module.css";

export default function Events() {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [fetchedFavs, setFetchedFavs] = useState([]);

  const [showEvents, setShowEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [date_time, setDate_time] = useState("all");

  const today = Date.now();

  async function toggleFav(eventId) {
    await axios.post(
      "http://localhost:3001/user/ddf40198-fc6c-4595-95cc-bda6d77fffaa/favEvent/" +
        eventId
    );
    fetchFavorites();
  }

  const eventCards =
    showEvents.length > 0 ? (
      showEvents.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          image={event.image}
          location={event.location}
          desc={event.description}
          isFavorite={
            !!fetchedFavs.find((favEvent) => event.id === favEvent.id)
          }
          togFav={toggleFav}
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
    const events = await axios.get("http://localhost:3001/event");
    setFetchedEvents(events.data);
    setShowEvents(events.data);
  };
  const fetchFavorites = async () => {
    const favs = await axios.get(
      "http://localhost:3001/favorite/ddf40198-fc6c-4595-95cc-bda6d77fffaa/event"
    );
    setFetchedFavs(favs.data);
  };

  // ************ FILTERS
  function handleCategory(e) {
    setCategory(e.target.value);
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function handleDate_time(e) {
    setDate_time(e.target.value);
  }
  useEffect(() => {
    setShowEvents(
      fetchedEvents.filter(
        (event) =>
          (search !== ""
            ? event.title.toLowerCase().includes(search.toLowerCase())
            : true) &&
          (category !== "all" ? event.category === category : true) &&
          (date_time !== "all" && date_time === "upcoming"
            ? Date.parse(event.date) > today
            : Date.parse(event.date) < today)
      )
    );
  }, [search, category, date_time]);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Events</h1>
      <nav className={style.events_nav}>
        <select name="category" onChange={handleCategory}>
          <option value="all">All categories</option>
          <option value="drifting">Drifting</option>
          <option value="guest">Guest</option>
          <option value="music">Music</option>
        </select>
        <select name="date_time" onChange={handleDate_time}>
          <option value="all">All dates</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <input type="text" size="15" onChange={handleSearch} />
      </nav>
      <main>{eventCards}</main>
    </div>
  );
}
