import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchWhatsPopular } from "@services/tmdbApi";
import MovieCard from "@components/MovieCard/MovieCard";
import css from "./WhatsPopular.module.css";

export default function WhatsPopular({ initialPopular = [] }) {
  const [popular, setPopular] = useState(initialPopular);
  const [mediaType, setMediaType] = useState("movie");

  useEffect(() => {
    if (mediaType !== "movie") {
      fetchWhatsPopular(mediaType)
        .then((data) => setPopular(data || []))
        .catch((error) => {
          console.error("Error fetching popular data:", error);
          setPopular([]);
        });
    }
  }, [mediaType]);

  return (
    <section className={css.popularSection}>
      <div className={css.header}>
        <h2>What's Popular</h2>
        <div className={css.tabs}>
          <button
            className={mediaType === "movie" ? css.active : ""}
            onClick={() => setMediaType("movie")}
          >
            Movies
          </button>
          <button
            className={mediaType === "tv" ? css.active : ""}
            onClick={() => setMediaType("tv")}
          >
            TV Shows
          </button>
        </div>
      </div>

      <div className={css.scrollWrapper}>
        <div className={css.scrollContainer}>
          {Array.isArray(popular) && popular.length > 0 ? (
            popular.map((item) => (
              <div className={css.cardWrapper} key={item.id}>
                <MovieCard movie={item} />
              </div>
            ))
          ) : (
            <p>No popular movies available.</p>
          )}
        </div>
        <div className={css.rightFade}></div>
      </div>
    </section>
  );
}

WhatsPopular.propTypes = {
  initialPopular: PropTypes.array,
};
