import React from "react";
import style from "./BottomNav.module.css";
import { NavLink } from "react-router-dom";
import { Icons } from "../../common/Ico";
import { theme } from "../../common/theme";
import styled from "styled-components";

const StyledContainer = styled.nav`
  background-color: rgb(0, 0, 0);
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10000;
`;
const StyledUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledLi = styled.li`
  padding: 7px;
  width: 48px;
`;

export default function BottomNav() {
  const activeStyle = {
    fill: theme.red,
  };

  return (
    <StyledContainer>
      <StyledUl>
        <StyledLi>
          <NavLink
            to="/"
            className={style.icon}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <Icons.Home />
          </NavLink>
        </StyledLi>
        <StyledLi>
          <NavLink
            to="/wallet"
            className={style.icon}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <Icons.Wallet />
          </NavLink>
        </StyledLi>
        <StyledLi>
          <NavLink to="/" className={style.icon}>
            <Icons.Qr />
          </NavLink>
        </StyledLi>
        <StyledLi>
          <NavLink to="/" className={style.icon}>
            <Icons.Favorite />
          </NavLink>
        </StyledLi>
      </StyledUl>
    </StyledContainer>
  );
}
