import { useState } from "react";
import "./gallery.css"

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false); 

  const fetchData = async () => {
    setLoading(true);
    setIsFetching(true); 
    setLoadedCount(0); 
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random/20");
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const data = await response.json();
      setImages(data.message);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      setLoading(false);
      setIsFetching(false);
    }
  };

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <>
      <section className="hero">
        {(loading || isFetching) && loadedCount < images.length && (
          <div className="loader">
            <div className="loader-content">Загрузка...</div>
          </div>
        )}

        <div className="container hero">
          <h1 className="name">Галерея</h1>
          <button type="button" className="download" onClick={fetchData}>
            Загрузить картинки
          </button>
        </div>

        <div className="images">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt="Random Dog"
              className="dog-image"
              width={200}
              height={200}
              onLoad={handleImageLoad}
            />
          ))}
        </div>
      </section>
    </>
  );
}
