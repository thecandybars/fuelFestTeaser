import React from "react";
import logo from "../../img/fuelFestLogo.png";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 55px;
`;
const NavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span,
  img {
    margin-left: 15px;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL", "wght" 400, "GRAD" 0, "opsz" 48;
  }
`;

export default function TopNav() {
  return (
    <NavContainer>
      <NavBlock>
        <SideMenu />
        <Link to="/">
          <img src={logo} alt="FuelFest logo" width="150px" />
        </Link>
      </NavBlock>
      <NavBlock>
        <span className="material-symbols-outlined">notifications</span>
        <Link to="/user">
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </NavBlock>
    </NavContainer>
  );
}
