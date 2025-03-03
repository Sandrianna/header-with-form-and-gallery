import { Routes, Route } from "react-router";
import useLogIn from "./hooks/useLogIn.jsx";
import HomePage from "./pages/HomePage.jsx";
import Home from "./components/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Profile from "./pages/Profile.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  useLogIn();

  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
