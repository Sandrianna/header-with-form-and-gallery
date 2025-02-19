import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./index.css";

import Page from "./Page.jsx";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [logIn, setLogIn] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setMessage("");
    setLogIn(false);

    try {
      const response = await axios.post(
        "https://trainee.a.pinggy.link/auth/login",
        data
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setLogIn(true);
      } else if (response.status === 401) {
        setMessage(response.data.message);
      }
    } catch (err) {
      if (err.response) {
        setServerError(err.response.data.message || "Ошибка при входе");
      } else {
        setServerError("Произошла ошибка при отправке запроса");
      }
    }
  };

  if (logIn) {
    return <Page message={message} />;
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 id="h2-sign-in">Форма входа</h2>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="username"
          {...register("username", { required: "Имя обязательно!" })}
        />

        <p className="error" style={{ color: "red" }}>
          {errors.username?.message}
        </p>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          {...register("password", { required: "Пароль обязателен!" })}
        />
        <p className="error" style={{ color: "red" }}>
          {errors.password?.message}
        </p>
        <button type="submit" className="btn--submit">
          Войти
        </button>
      </form>
      {message && (
        <div className="infoMessage" style={{ color: "green" }}>
          {message}
        </div>
      )}
      {serverError && (
        <div className="infoMessage" style={{ color: "red" }}>
          {serverError}
        </div>
      )}
    </>
  );
}
