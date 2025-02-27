import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, Link } from "react-router";
import {
  Button,
  Typography,
  TextField,
  Alert,
  Box,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import "./index.css";

export default function Login({
  setLogIn,
  setMessage,
  errorMessage,
  setErrorMessage,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSnackbarMessage("");
    setErrorMessage("");
  }, [setErrorMessage]);

  useEffect(() => {
    if(errorMessage) {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    }
    
  }, [errorMessage]);

  const onSubmit = async (data) => {
    setMessage("");
    setSnackbarMessage("");

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
        setSnackbarMessage(response.data.message);
        setOpenSnackbar(true);
      }
    } catch (err) {
      if (err.response) {
        const errorText = err.response?.data.message || "Ошибка при входе";
        setSnackbarMessage(errorText);
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Произошла ошибка ");
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason == "clickway") return;
    setOpenSnackbar(false);
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
