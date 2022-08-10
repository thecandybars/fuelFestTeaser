import React from "react";
import { NavLink } from "react-router-dom";

export default function MainLinks() {
  return (
    <div>
      <ul>
        <NavLink to="/cars">
          <li>Cars</li>
        </NavLink>
        <NavLink to="/events">
          <li>Events</li>
        </NavLink>
        <li>Maps</li>
        <li>Sponsors</li>
        <li>Market</li>
      </ul>
    </div>
  );
}
