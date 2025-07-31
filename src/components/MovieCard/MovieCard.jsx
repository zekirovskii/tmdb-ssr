import Link from 'next/link';
import PropTypes from 'prop-types';
import css from './MovieCard.module.css';
import StarButton from '../StarButton/StarButton';
import { useFavorites } from '@context/FavoritesContext';
import Rating from '../Rating/Rating';

export default function MovieCard({ movie }) {
  const {
    id,
    title,
    name,
    poster_path,
    vote_average,
    release_date,
    first_air_date
  } = movie;

  const displayTitle = title || name;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : '/placeholder-300x450.png';

  const date = (release_date || first_air_date)
    ? new Date(release_date || first_air_date).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const { isFavorite, toggleFavorite } = useFavorites();

  // Film mi dizi mi belirle
  const type = first_air_date ? 'tvshows' : 'movies';

  return (
    <Link href={`/${type}/detail/${id}`} className={css.cardLink}>
      <div className={css.card}>
        <div className={css.posterWrapper}>
          <img src={posterUrl} alt={displayTitle} className={css.poster} />

          <StarButton
            isActive={isFavorite(id)}
            onClick={(e) => {
              e.preventDefault(); 
              toggleFavorite(movie);
            }}
          />

          <Rating value={vote_average} />
        </div>

        <div className={css.info}>
          <h3 className={css.title}>{displayTitle}</h3>
          <p className={css.date}>{date}</p>
        </div>
      </div>
    </Link>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
  }).isRequired,
};
