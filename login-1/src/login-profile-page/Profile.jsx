import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useErrorMessage } from "../Provider/ErrorProvider";
import { useAuth } from "../Provider/AuthProvider";
import useLogIn from "../useLogIn.jsx";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Profile({ message }) {
  const { setLogIn } = useAuth();
  const { setErrorMessage } = useErrorMessage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useLogIn();

  const handleLogOut = () => {
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile")
      .then((response) => {
        setProfile(response.data);
        setLogIn(true);
      })

      .catch(() => {
        setErrorMessage("Ошибка загрузки профиля");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", marginTop: 9 }}
      >
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <CircularProgress />
          </Box>
        )}
        <Typography variant="h5" gutterBottom>
          {profile?.username
            ? `Добро пожаловать, ${profile.username}!`
            : "Проверка входа"}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogOut}
          sx={{ marginTop: 3 }}
        >
          Выйти
        </Button>
      </Paper>
    </Container>
  );
}
