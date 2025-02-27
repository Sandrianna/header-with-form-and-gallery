import { useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./home-page/HomePage.jsx";
import Home from "./header/Home.jsx";
import Gallery from "./gallery-page/Gallery.jsx";
import Profile from "./login-profile-page/Profile.jsx";
import SignUp from "./login-profile-page/SignUp.jsx";
import Login from "./login-profile-page/Login.jsx";

export default function App() {
  const [logIn, setLogIn] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    profile: "",
    gallery: "",
  });

  return (
    <>
      <Home logIn={logIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery logIn={logIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
        <Route
          path="/login"
          element={<Login setLogIn={setLogIn} setMessage={setMessage} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
        />
        <Route
          path="/registration"
          element={<SignUp message={message} setLogIn={setLogIn} />}
        />
        <Route
          path="/profile"
          element={<Profile message={message} setLogIn={setLogIn}  setErrorMessage={setErrorMessage}/>}
        />
      </Routes>
    </>
  );
}
