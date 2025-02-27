import { useState } from "react";
import { useErrorMessage } from "../Provider/ErrorProvider";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Typography,
  ImageList,
  ImageListItem,
  Alert,
} from "@mui/material";
import "./gallery.css";
import { useNavigate } from "react-router";

export default function Gallery({ logIn }) {
  const { setErrorMessage } = useErrorMessage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setIsFetching(true);
    setLoadedCount(0);
    if (logIn) {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/20"
        );
        if (!response.ok) {
          throw new Error("Ошибка галереи");
        }
        const data = await response.json();
        setImages(data.message);
        setErrorMessage("");
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
        setLoading(false);
        setIsFetching(false);
      }
    } else {
      setErrorMessage("Вы не вошли в профиль!");
      setLoading(false);
      setIsFetching(false);
      navigate("/login");
    }
  };

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <Container>
      <Box textAlign="center" my={9}>
        <Typography variant="h3" component="h1" gutterBottom>
          Галерея
        </Typography>
        <Button
          variant="contained"
          sx={{ padding: "15px" }}
          color="primary"
          onClick={fetchData}
        >
          Загрузить картинки
        </Button>

        {(loading || isFetching) && loadedCount < images.length && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <ImageList cols={4} gap={8}>
        {images.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img
              src={imageUrl}
              alt="Random Dog"
              width="100%"
              onLoad={handleImageLoad}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
