import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/main.css";
import { ErrorProvider } from "./context/ErrorProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </AuthProvider>
  </BrowserRouter>
);
