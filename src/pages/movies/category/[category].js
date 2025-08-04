import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchMoviesOrTvByCategory, fetchGenres } from "@services/tmdbApi";
import MovieCard from "@components/MovieCard/MovieCard";
import PopoverMenu from "@components/PopoverMenu/PopoverMenu";
import { getFormattedTitle } from "@utils/formatters";
import css from "@styles/CategoryPage.module.css";
import Head from "next/head";

export default function MoviesCategoryPage({ initialMovies, initialGenres, category }) {
  const [allItems, setAllItems] = useState(initialMovies);
  const [items, setItems] = useState(initialMovies);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sort, setSort] = useState("popularity.desc");
  const [filters, setFilters] = useState({
    rating: false,
    popularity: false,
    favorites: false,
    startDate: null,
    endDate: null,
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState(initialGenres);

  // Sayfa yüklendiğinde state'i sıfırla
  useEffect(() => {
    setAllItems(initialMovies);
    setItems(initialMovies);
    setVisibleCount(10);
    setGenres(initialGenres);
    setFilters({
      rating: false,
      popularity: false,
      favorites: false,
      startDate: null,
      endDate: null,
    });
    setSelectedGenres([]);
  }, [initialMovies, initialGenres, category]);

  const handleSortChange = (e) => setSort(e.target.value);

  const handleCheckboxFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleDateFilterChange = (name, date) => {
    setFilters((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleGenreChange = (e) => {
    const id = Number(e.target.value);
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleSearchSubmit = () => {
    let filtered = [...allItems];

    if (filters.rating) filtered = filtered.filter((item) => item.vote_average >= 7);
    if (filters.popularity) filtered = filtered.filter((item) => item.popularity >= 100);

    if (filters.favorites && typeof window !== "undefined") {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      filtered = filtered.filter((item) => favs.some((fav) => fav.id === item.id));
    }

    if (filters.startDate) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.release_date || item.first_air_date);
        return date >= filters.startDate;
      });
    }
    if (filters.endDate) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.release_date || item.first_air_date);
        return date <= filters.endDate;
      });
    }
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((item) =>
        item.genre_ids?.some((id) => selectedGenres.includes(id))
      );
    }

    const [field, direction] = sort.split(".");
    filtered.sort((a, b) => {
      const getValue = (obj, key) => {
        if (key === "title" || key === "name")
          return (obj.title || obj.name || "").toLowerCase();
        if (key === "release_date" || key === "first_air_date")
          return new Date(obj.release_date || obj.first_air_date);
        return obj[key] || 0;
      };

      const aVal = getValue(a, field);
      const bVal = getValue(b, field);

      if (typeof aVal === "string") {
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    });

    setItems(filtered);
    setVisibleCount(10);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);

  const isFilterApplied =
    Object.values(filters).some((value) => !!value) || selectedGenres.length > 0;

  return (
    <>
      <Head>
        <title>{`${getFormattedTitle("movies", category)} | TMDB`}</title>
        <meta name="description" content={`Browse ${category} movies on TMDB`} />
      </Head>

      <div className={css.pageWrapper}>
        <PopoverMenu
          filters={filters}
          sort={sort}
          onSortChange={handleSortChange}
          onCheckboxFilterChange={handleCheckboxFilterChange}
          onDateFilterChange={handleDateFilterChange}
          onSearch={handleSearchSubmit}
          isFilterApplied={isFilterApplied}
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
        />

        <div className={css.contentWrapper}>
          <h1 className={css.heading}>{getFormattedTitle("movies", category)}</h1>
          <div className={css.grid}>
            {items.slice(0, visibleCount).map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
          {visibleCount < items.length && (
            <button className={css.loadMore} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}

MoviesCategoryPage.propTypes = {
  category: PropTypes.string.isRequired,
  initialMovies: PropTypes.array.isRequired,
  initialGenres: PropTypes.array.isRequired,
};

export async function getServerSideProps({ params }) {
  const { category } = params;

  const moviesData = await fetchMoviesOrTvByCategory("movies", category);
  const genresData = await fetchGenres("movies");

  return {
    props: {
      category,
      initialMovies: moviesData.results || [],
      initialGenres: genresData || [],
    },
  };
}
