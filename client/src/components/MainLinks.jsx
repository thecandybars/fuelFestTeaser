import React from "react";
import { NavLink } from "react-router-dom";

export default function MainLinks() {
  return (
    <div>
      <ul>
        <li>Cars</li>
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
