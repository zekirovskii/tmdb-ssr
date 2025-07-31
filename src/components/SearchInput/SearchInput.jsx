import { useState, useEffect, useRef } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import css from "./SearchInput.module.css";
import useDebounce from "@hooks/useDebounce";
import { fetchTrending, searchItem } from "@services/tmdbApi";
import { useSearch } from "@context/SearchContext";

export default function SearchInput() {
  const { showDropdown, openDrop, closeDrop } = useSearch();
  const dropdownRef = useRef();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [items, setItems] = useState([]);
  const router = useRouter();

  // Dropdown dışına tıklama
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDrop();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [closeDrop]);

  // Trending veya search results
  useEffect(() => {
    if (!showDropdown) return;

    const term = debouncedQuery.trim();

    if (term.length < 3) {
      fetchTrending()
        .then((results) => setItems(results))
        .catch(console.error);
      return;
    }

    searchItem(term)
      .then((data) => setItems(data.results))
      .catch(console.error);
  }, [debouncedQuery, showDropdown]);

  const handleSearch = () => {
    if (query.trim().length >= 3) {
      router.push(`/search/${encodeURIComponent(query)}`);
      closeDrop();
    }
  };

  return (
    <div className={css.searchDiv} ref={dropdownRef}>
      <button className={css.searchIcon} onClick={openDrop}>
        <FaSearch />
      </button>
      <input
        type="text"
        className={css.inputSearch}
        placeholder="Search for a movie, TV show or person..."
        value={query}
        onFocus={openDrop}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {showDropdown && (
        <div className={css.dropdown}>
          <div className={css.dropdownContent}>
            <div className={css.trendHeader}>
              <div>
                <FaArrowTrendUp className={css.trendIcon} />
                <span>
                  {debouncedQuery.trim().length < 3
                    ? "Mainstream"
                    : `Results for '${debouncedQuery}'`}
                </span>
              </div>
            </div>
            <ul className={css.trendList}>
              {items.length > 0 ? (
                items.slice(0, 8).map((item) => (
                  <li
                    key={item.id}
                    className={css.trendItem}
                    onClick={() => {
                      const term = (item.title || item.name || "").trim();
                      if (term.length >= 3) {
                        router.push(`/search/${encodeURIComponent(term)}`);
                        closeDrop();
                      }
                    }}
                  >
                    <FaSearch className={css.listIcon} />
                    {item.title || item.name}
                  </li>
                ))
              ) : debouncedQuery.length >= 3 ? (
                <li className={css.trendItem}>No results</li>
              ) : null}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
