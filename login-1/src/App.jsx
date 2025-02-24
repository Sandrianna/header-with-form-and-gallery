import { useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./HomePage.jsx";
import Home from "./Home.jsx";
import Gallery from "./Gallery.jsx";
import Profile from "./Profile.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";

export default function App() {
  const [logIn, setLogIn] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Home logIn={logIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/login"
          element={<Login setLogIn={setLogIn} setMessage={setMessage} />}
        />
        <Route
          path="/registration"
          element={<SignUp message={message} setLogIn={setLogIn} />}
        />
        <Route
          path="/profile"
          element={<Profile message={message} setLogIn={setLogIn} />}
        />
      </Routes>
    </>
  );
}
