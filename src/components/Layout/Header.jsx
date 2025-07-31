import Link from "next/link";
import { useRouter } from "next/router";
import css from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "@context/SearchContext";
import SearchInput from "../SearchInput/SearchInput";


export default function Header() {
  const router = useRouter();
  const { toggleSearchInput, forceOpenDropdown } = useSearch();
  const isHome = router.pathname === "/";

  const handleSearchClick = () => {
    if (isHome) {
      forceOpenDropdown();
    } else {
      toggleSearchInput();
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logo}>
          <Link href="/" className={css.logoLink}>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB Logo"
              className={css.logoImage}
            />
          </Link>
        </div>

        <nav className={css.nav}>
          <div className={css.navItem}>
            <span className={css.navLink}>Movies</span>
            <ul className={css.dropdown}>
              <li>
                <Link href="/movies/category/popular">Popular</Link>
              </li>
              <li>
                <Link href="/movies/category/top_rated">Top Rated</Link>
              </li>
              <li>
                <Link href="/movies/category/upcoming">Upcoming</Link>
              </li>
            </ul>
          </div>

          <div className={css.navItem}>
            <span className={css.navLink}>TV Shows</span>
            <ul className={css.dropdown}>
              <li>
                <Link href="/tvshows/category/popular">Popular</Link>
              </li>
              <li>
                <Link href="/tvshows/category/top_rated">Top Rated</Link>
              </li>
              <li>
                <Link href="/tvshows/category/on_the_air">On The Air</Link>
              </li>
            </ul>
          </div>
        </nav>

        <button className={css.searchIcon} onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>
      
    </header>
  );
}
