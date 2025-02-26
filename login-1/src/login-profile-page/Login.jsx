import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, Link } from "react-router";
import { Button, Typography, TextField, Alert, Box } from "@mui/material";
import axios from "axios";
import "./index.css";

export default function Login({ setLogIn, setMessage, errorMessage}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError("");
    setMessage("");

    /*if(!data.username.trim()){
        setError("username", {type: "manual", message: "Имя не должно содержать пробелов или пустых строк!"});
        return;
    }

    if(!data.password.trim()){
        setError("password", {type: "manual", message: "Пароль не должен содержать пробелов или пустых строк!"});
        return;
    }*/

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username: data.username.trim(),
        password: data.password.trim(),
      });

      if (response.status === 201) {

        setLogIn(true);
        navigate("/profile");
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
  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom align="center">
          Форма входа
        </Typography>
        <TextField
          label="Имя пользователя"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("username", {
            required: "Имя обязательно!",
            validate: (value) =>
              /^\S+$/.test(value) ||
              "Имя не должно содержать пробелов или пустых строк!",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        ></TextField>
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Пароль обязателен!",
            validate: (value) =>
              /^\S+$/.test(value) ||
              "Пароль не должен содержать пробелов или пустых строк!",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="btn--submit"
          sx={{ marginTop: 3 }}
        >
          Войти
        </Button>
        <Box textAlign="center" marginTop={3}>
          <Typography variant="body2">
            Все еще не зарегистрированы?
            <Link component={NavLink} to="/registration" variant="body2">
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>
      </form>

      {serverError && (
        <Alert severity="error" sx={{ marginTop: 10 }}>
          {serverError}
        </Alert>
      )}

{errorMessage?.profile && (
        <Alert severity="error" sx={{ marginTop: 10 }}>
          {errorMessage.profile}
        </Alert>
      )}
    </>
  );
}
