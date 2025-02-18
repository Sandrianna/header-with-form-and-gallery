import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./main.css";
import Home from "./Home.jsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);
