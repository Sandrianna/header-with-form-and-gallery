import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../Provider/AuthProvider"; 
import { Button, Typography, TextField } from "@mui/material";
import axios from "axios";

export default function SignUp({ message }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setLogIn } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username: data.username.trim(),
        password: data.password.trim(),
      });
      alert("Регистрация прошла успешно!");
      setLogIn(true);
      navigate("/profile");
    } catch (err) {
      alert("Ошибка регистрации:" + err.response?.data?.message);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Регистрация
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
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
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
          type="sumbit"
          variant="contained"
          color="primary"
          className="btn--submit"
          sx={{ marginTop: 3 }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
}
