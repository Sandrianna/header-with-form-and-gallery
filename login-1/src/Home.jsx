import { useState } from "react";
import Gallery from "./Gallery";
import App from "./App";
import './main.css'

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home"); 

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a className={currentPage === "home" ? "link link--active" : "link"} 
                 href="#" onClick={() => setCurrentPage("home")}>
                Главная
              </a>
            </li>
            <li>
              <a className={currentPage === "gallery" ? "link link--active" : "link"} 
                 href="#" onClick={() => setCurrentPage("gallery")}>
                Галерея
              </a>
            </li>
            <li>
              <a className={currentPage === "login" ? "link link--active" : "link"} 
                 href="#" onClick={() => setCurrentPage("login")}>
                Войти
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {currentPage === "home" && <h1>Добро пожаловать на главную страницу!</h1>}
        {currentPage === "gallery" && <Gallery />}
        {currentPage === "login" && <App />}
      </main>
    </>
  );
}
