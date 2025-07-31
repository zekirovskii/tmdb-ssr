import PropTypes from "prop-types";
import { fetchDetailsById, fetchCreditsById, fetchVideosById } from "@services/tmdbApi";
import { useFavorites } from "@context/FavoritesContext";
import StarButton from "@components/StarButton/StarButton";
import Rating from "@components/Rating/Rating";
import css from "@styles/DetailPage.module.css";
import { FaUser } from "react-icons/fa";

export default function TvDetailPage({ show, credits, trailerKey }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    name,
    poster_path,
    vote_average,
    overview,
    first_air_date,
    number_of_seasons,
    genres,
    original_language,
    tagline,
    backdrop_path,
  } = show;

  const displayGenres = genres?.map((g) => g.name).join(", ");
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder-500x750.png";
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : null;

  return (
    <>
      <div
        className={css.topSection}
        style={
          backdropUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(13, 37, 63, 0.9), rgba(13, 37, 63, 0.7)), url(${backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className={css.container}>
          <img src={posterUrl} alt={name} className={css.poster} />

          <div className={css.details}>
            <div className={css.header}>
              <h1 className={css.title}>{name}</h1>
              <StarButton
                isActive={isFavorite(show.id)}
                onClick={() => toggleFavorite(show)}
              />
            </div>

            <div className={css.meta}>
              <span>
                <Rating value={vote_average} variant="inline" />
              </span>
              <span> • {first_air_date}</span>
              {number_of_seasons && <span> • {number_of_seasons} Season(s)</span>}
              <span> • {original_language?.toUpperCase()}</span>
            </div>

            <section className={css.summarySection}>
              <h2>Summary</h2>
              <p className={css.overview}>
                {overview?.trim() ||
                  tagline?.trim() ||
                  `${name} hakkında özet bilgi mevcut değil.`}
              </p>
            </section>

            <div className={css.extra}>
              <p>
                <strong>Genres:</strong> {displayGenres || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className={css.castSection}>
        <h2>Top Billed Cast</h2>
        <div className={css.castSliderWrapper}>
          <ul className={css.castSlider}>
            {credits.cast.slice(0, 10).map((actor) => (
              <li key={actor.id} className={css.castCard}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className={css.castImg}
                  />
                ) : (
                  <div className={css.placeholderIcon}>
                    <FaUser size={48} />
                  </div>
                )}
                <div className={css.castInfo}>
                  <strong>{actor.name}</strong>
                  <p>{actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={css.rightFade}></div>
        </div>
      </section>

      {trailerKey && (
        <section className={css.trailerSection}>
          <h2>Official Trailer</h2>
          <div className={css.trailerWrapper}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Official Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </>
  );
}

TvDetailPage.propTypes = {
  show: PropTypes.object.isRequired,
  credits: PropTypes.object.isRequired,
  trailerKey: PropTypes.string,
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const show = await fetchDetailsById("tvshows", id);
  const credits = await fetchCreditsById("tvshows", id);
  const videos = await fetchVideosById("tvshows", id);

  const trailer = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  return {
    props: {
      show,
      credits,
      trailerKey: trailer ? trailer.key : null,
    },
  };
}
