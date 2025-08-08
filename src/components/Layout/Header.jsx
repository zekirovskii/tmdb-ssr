import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import css from "./Header.module.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useSearch } from "@context/SearchContext";

export default function Header() {
  const router = useRouter();
  const { toggleSearchInput, forceOpenDropdown } = useSearch();
  const isHome = router.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSearchClick = () => {
    if (isHome) {
      forceOpenDropdown();
    } else {
      toggleSearchInput();
    }
  };

  // Dış tıklama ile menüyü kapatma
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={css.header}>
      <div className={css.container}>
        {/* Mobil hamburger */}
        <button
          className={css.menuBtn}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <div className={css.logo}>
          <Link href="/" className={css.logoLink}>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB Logo"
              className={css.logoImage}
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className={css.nav}>
          <div className={css.navItem}>
            <span className={css.navLink}>Movies</span>
            <ul className={css.dropdown}>
              <li><Link href="/movies/category/popular">Popular</Link></li>
              <li><Link href="/movies/category/top_rated">Top Rated</Link></li>
              <li><Link href="/movies/category/upcoming">Upcoming</Link></li>
            </ul>
          </div>
          <div className={css.navItem}>
            <span className={css.navLink}>TV Shows</span>
            <ul className={css.dropdown}>
              <li><Link href="/tvshows/category/popular">Popular</Link></li>
              <li><Link href="/tvshows/category/top_rated">Top Rated</Link></li>
              <li><Link href="/tvshows/category/on_the_air">On The Air</Link></li>
            </ul>
          </div>
        </nav>

        {/* Search icon */}
        <button className={css.searchIcon} onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>

      {/* Mobile açılır menü */}
      {/* Mobile açılır menü */}
{menuOpen && (
  <div className={css.mobileMenu} ref={menuRef}>
    <div className={css.mobileSection}>
      <span>Movies</span>
      <ul>
        <li>
          <Link href="/movies/category/popular" onClick={() => setMenuOpen(false)}>
            Popular
          </Link>
        </li>
        <li>
          <Link href="/movies/category/top_rated" onClick={() => setMenuOpen(false)}>
            Top Rated
          </Link>
        </li>
        <li>
          <Link href="/movies/category/upcoming" onClick={() => setMenuOpen(false)}>
            Upcoming
          </Link>
        </li>
      </ul>
    </div>
    <div className={css.mobileSection}>
      <span>TV Shows</span>
      <ul>
        <li>
          <Link href="/tvshows/category/popular" onClick={() => setMenuOpen(false)}>
            Popular
          </Link>
        </li>
        <li>
          <Link href="/tvshows/category/top_rated" onClick={() => setMenuOpen(false)}>
            Top Rated
          </Link>
        </li>
        <li>
          <Link href="/tvshows/category/on_the_air" onClick={() => setMenuOpen(false)}>
            On The Air
          </Link>
        </li>
      </ul>
    </div>
  </div>
)}

    </header>
  );
}
