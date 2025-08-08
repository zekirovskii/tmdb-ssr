import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { fetchVideosById, fetchTrailersByCategory } from "@services/tmdbApi";
import css from "./LatestTrailer.module.css";

const CATEGORIES = ["popular", "streaming", "on_tv", "for_rent", "in_theaters"];
const labelize = (s) => s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function LatestTrailers({ initialTrailers, initialIndex = 0 }) {
  const [trailers, setTrailers] = useState(initialTrailers);
  const [category, setCategory] = useState("popular");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // mobile dropdown state
  const [openDD, setOpenDD] = useState(false);
  const ddRef = useRef(null);

  // dış tıklama ile dropdown kapat
  useEffect(() => {
    const onDown = (e) => {
      if (openDD && ddRef.current && !ddRef.current.contains(e.target)) setOpenDD(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openDD]);

  useEffect(() => {
    if (category !== "popular") fetchTrailersByCategory(category).then(setTrailers);
  }, [category]);

  useEffect(() => {
  if (!selectedTrailer) return;

  fetchVideosById(selectedTrailer.media_type, selectedTrailer.id)
    .then((data) => {
      if (!data || !Array.isArray(data.results) || data.results.length === 0) {
        setTrailerKey(null);
        return;
      }
      const trailer = data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      setTrailerKey(trailer ? trailer.key : null);
    })
    .catch((err) => {
      console.error("Trailer fetch error:", err);
      setTrailerKey(null);
    });
}, [selectedTrailer]);



  useEffect(() => {
  const lock = !!selectedTrailer;
  document.body.style.overflow = lock ? "hidden" : "";
  return () => (document.body.style.overflow = "");
}, [selectedTrailer]);

  const backgroundImage =
    trailers[initialIndex]?.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original${trailers[initialIndex].backdrop_path})`
      : "none";

  return (
    <>
      <section className={css.trailerSection} style={{ backgroundImage }}>
        <div className={css.container}>
          <div className={css.header}>
            <h2>Latest Trailers</h2>

            <div className={css.tabs}>
              
              <div className={css.tabButtons}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={category === cat ? css.active : ""}
                    onClick={() => setCategory(cat)}
                  >
                    {labelize(cat)}
                  </button>
                ))}
              </div>

              
              <div className={css.tabSelect} ref={ddRef}>
                <button
                  className={css.dropdownBtn}
                  aria-haspopup="listbox"
                  aria-expanded={openDD}
                  onClick={() => setOpenDD((v) => !v)}
                >
                  {labelize(category)}
                  <span className={`${css.caret} ${openDD ? css.caretUp : ""}`} />
                </button>

                {openDD && (
                  <ul className={css.dropdownList} role="listbox">
                    {CATEGORIES.map((cat) => (
                      <li
                        key={cat}
                        role="option"
                        aria-selected={category === cat}
                        className={`${css.dropdownItem} ${category === cat ? css.dropdownItemActive : ""}`}
                        onClick={() => {
                          setCategory(cat);
                          setOpenDD(false);
                        }}
                      >
                        {labelize(cat)}
                        {category === cat && <span className={css.tick}>  ✓</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
                    <button className={css.playBtn} onClick={() => setSelectedTrailer(video)}>▶</button>
                  </div>
                  <p className={css.trailerName}>{video.title || video.name}</p>
                </div>
              ))}
            </div>
            <div className={css.rightFade} />
          </div>
        </div>
      </section>

      {selectedTrailer && trailerKey && (
  <div className={css.modalOverlay} onClick={() => setSelectedTrailer(null)}>
    <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
      <div className={css.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  </div>
)}
    </>
  );
}

LatestTrailers.propTypes = {
  initialTrailers: PropTypes.array.isRequired,
};
