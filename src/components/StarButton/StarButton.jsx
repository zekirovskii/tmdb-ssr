import { FaStar, FaRegStar } from 'react-icons/fa';
import css from './StarButton.module.css';

export default function StarButton({ isActive, onClick }) {
  return (
    <button
      className={css.star}
      onClick={onClick}
      aria-label={isActive ? 'Favoriden çıkar' : 'Favoriye ekle'}
    >
      {isActive ? <FaStar size={20} /> : <FaRegStar size={20} />}
    </button>
  );
}
