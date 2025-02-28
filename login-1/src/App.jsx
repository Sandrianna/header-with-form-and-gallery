import { useState } from "react";
import { Routes, Route } from "react-router";
import { ErrorProvider } from "./Provider/ErrorProvider.jsx";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import useLogIn from "./useLogIn.jsx";
import HomePage from "./home-page/HomePage.jsx";
import Home from "./header/Home.jsx";
import Gallery from "./gallery-page/Gallery.jsx";
import Profile from "./login-profile-page/Profile.jsx";
import SignUp from "./login-profile-page/SignUp.jsx";
import Login from "./login-profile-page/Login.jsx";

export default function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <AuthProvider>
        <ErrorProvider>
          <InterceptorWrapper />
          <Home />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login setMessage={setMessage} />} />
            <Route
              path="/registration"
              element={<SignUp message={message} />}
            />
            <Route path="/profile" element={<Profile message={message} />} />
          </Routes>
        </ErrorProvider>
      </AuthProvider>
    </>
  );
}

function InterceptorWrapper() {
  useLogIn();
  return null;
}
