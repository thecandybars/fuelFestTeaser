import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import dotenv from "dotenv";
import { ThemeProvider } from "styled-components";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API;

// THEME
const theme = {
  yellow: "#feae2e",
  white: "#d9d9d9",
  red: "#da1921",
  green: "#00703d",
  dialogBackground: "rgba(10, 10, 10, 0.97)",
  black: "#000000",
};

// RENDER
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
