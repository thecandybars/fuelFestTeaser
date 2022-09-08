import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import dotenv from "dotenv";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import { ThemeProvider } from "styled-components";
import { theme, themeMUI } from "./common/theme";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API;

// RENDER
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderMUI theme={themeMUI}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ThemeProviderMUI>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
