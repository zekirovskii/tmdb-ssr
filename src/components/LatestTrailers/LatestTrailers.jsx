import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchVideosById, fetchTrailersByCategory } from "@services/tmdbApi";

import css from "./LatestTrailer.module.css";

export default function LatestTrailers({ initialTrailers, initialIndex = 0 }) {
  const [trailers, setTrailers] = useState(initialTrailers);
  const [category, setCategory] = useState("popular");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (category !== "popular") {
      fetchTrailersByCategory(category).then(setTrailers);
    }
  }, [category]);

  useEffect(() => {
    if (selectedTrailer) {
      fetchVideosById("movie", selectedTrailer.id).then((data) => {
        const trailer = data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailerKey(trailer ? trailer.key : null);
      });
    }
  }, [selectedTrailer]);

  const backgroundImage = trailers[initialIndex]?.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${trailers[initialIndex].backdrop_path})`
    : "none";

  return (
    <>
      <section
        className={css.trailerSection}
        style={{ backgroundImage }}
      >
        <div className={css.container}>
          <div className={css.header}>
            <h2>Latest Trailers</h2>
            <div className={css.tabs}>
              {["popular", "streaming", "on_tv", "for_rent", "in_theaters"].map(
                (cat) => (
                  <button
                    key={cat}
                    className={category === cat ? css.active : ""}
                    onClick={() => setCategory(cat)}
                  >
                    {cat.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </button>
                )
              )}
            </div>
          </div>

          <div className={css.scrollWrapper}>
            <div className={css.trailerList}>
              {trailers.map((video) => (
                <div className={css.trailerCard} key={video.id}>
                  <div className={css.thumbnail}>
                    <img
                      src={`https://image.tmdb.org/t/p/w400${video.backdrop_path}`}
                      alt={video.title || video.name}
                    />
                    <button
                      className={css.playBtn}
                      onClick={() => setSelectedTrailer(video)}
                    >
                      ▶
                    </button>
                  </div>
                  <p className={css.trailerName}>{video.title || video.name}</p>
                </div>
              ))}
            </div>
            <div className={css.rightFade}></div>
          </div>
        </div>
      </section>

      {selectedTrailer && trailerKey && (
        <div
          className={css.modalOverlay}
          onClick={() => setSelectedTrailer(null)}
        >
          <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

LatestTrailers.propTypes = {
  initialTrailers: PropTypes.array.isRequired,
};
