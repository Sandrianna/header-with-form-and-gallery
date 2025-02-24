import { NavLink } from "react-router";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

export default function Home({ logIn }) {
  return (
    <AppBar position="fixed" sx={{ width: "100%", top: 0, left: 0, zIndex: 1 }}>
      <Toolbar>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={NavLink} to="/">
            Главная
          </Button>
          <Button color="inherit" component={NavLink} to="/gallery">
            Галерея
          </Button>
        </Box>

        <Box marginLeft="auto">
          <Button
            color="inherit"
            component={NavLink}
            to={logIn ? "/profile" : "/login"}
          >
            {logIn ? "Профиль" : "Войти"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
