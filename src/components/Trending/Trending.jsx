import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";
import css from "./Trending.module.css";
import { useState, useEffect } from "react";
import { fetchTrending } from "@services/tmdbApi";

export default function Trending({ items }) {
  const [trending, setTrending] = useState(items);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    if (timeWindow !== "day") {
      async function loadTrending() {
        try {
          const data = await fetchTrending(timeWindow);
          setTrending(data);
        } catch (error) {
          console.error("Error fetching trending:", error);
          setTrending([]);
        }
      }
      loadTrending();
    }
  }, [timeWindow]);

  return (
    <section className={css.trendingSection}>
      <div className={css.header}>
        <h2>Trending</h2>
        <div className={css.tabs}>
          <button
            className={timeWindow === "day" ? css.active : ""}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </button>
          <button
            className={timeWindow === "week" ? css.active : ""}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </button>
        </div>
      </div>

      <div className={css.scrollWrapper}>
        <div className={css.scrollContainer}>
          {trending.map((movie) => (
            <div className={css.cardWrapper} key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <div className={css.rightFade}></div>
      </div>
    </section>
  );
}

Trending.propTypes = {
  items: PropTypes.array.isRequired,
};
