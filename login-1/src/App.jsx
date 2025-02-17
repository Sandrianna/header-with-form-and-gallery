import { useState } from "react";
import axios from "axios";
import './index.css'

import Page from './Page.jsx'

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [logIn, setLogIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://trainee.a.pinggy.link/auth/login",
        {
          username,
          password,
        }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setLogIn(true);
      } else if (response.status === 401) {
        setMessage(response.data.message);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Ошибка при входе");
      } else {
        setError("Произошла ошибка при отправке запроса");
      }
    }
  };

  if(logIn){
    return(
      <Page message={message} />
  );

  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 id="h2-sign-in">Форма входа</h2>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <button type="submit" className="btn--submit">
          Войти
        </button>
      </form>

      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
}
