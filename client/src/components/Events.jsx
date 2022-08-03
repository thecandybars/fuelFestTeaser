import React, { useEffect, useState } from "react";
import axios from "axios";

import EventCard from "./EventCard";
import style from "./Events.module.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  const eventCards = events.map((event) => (
    <EventCard
      title={event.title}
      date={event.date}
      image={event.image}
      location={event.location}
    />
  ));

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3001/event");
    setEvents(response.data);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Events</h1>
      <nav className={style.events_nav}>
        <input type="text" size="15" />
        <input type="text" size="15" />
        <input type="text" size="15" />
      </nav>
      <main>{eventCards}</main>
    </div>
  );
}
