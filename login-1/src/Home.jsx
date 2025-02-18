import { Routes, Route, NavLink } from "react-router";
import Gallery from "./Gallery";
import App from "./App";
import "./main.css";

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Галерея
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<h1>Добро пожаловать на главную страницу!</h1>}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<App />} />
        </Routes>
      </main>
    </>
  );
}
