import { useNavigate } from "react-router";
import { Button, Container, Typography, Paper } from "@mui/material";

export default function Profile({ message, setLogIn }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    setLogIn(false);
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", marginTop: 9 }}
      >
        <Typography variant="h4" gutterBottom>
          Вход выполнен успешно!
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
