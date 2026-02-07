import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/inter"; // 400
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
const COLORS = {
  bg: "#f9e8c9",
  white: "#FFFFFF",

  textPrimary: "#1F1F1F",
  textSecondary: "#6B6B6B",

  primary: "#2FBF71",
  primarySoft: "#E6F7ED",

  border: "#E6E6E6",
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>,
);
