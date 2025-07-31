import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { searchItem } from "@services/tmdbApi";
import css from "@styles/SearchResultsPage.module.css";
import { MdMovie } from "react-icons/md";
import Pagination from "@components/Pagination/Pagination";

export default function SearchResultsPage() {
  const router = useRouter();
  const { query } = router.query;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError("");

    searchItem(query, page)
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          setError("No movies were found matching your query.");
        }
        setResults(data.results.slice(0, 10));
        setTotalPages(Math.min(data.totalPages, 50));
      })
      .catch(() => setError("Something went wrong."))
      .finally(() => setLoading(false));
  }, [query, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;

  return (
    <div className={css.resultsPage}>
      <h2>Results for "{query}"</h2>
      <div className={css.resultsGrid}>
        {results.map((item) => (
          <div
            key={item.id}
            className={css.resultCard}
            onClick={() => {
              const type =
                item.media_type === "tv"
                  ? "tvshows"
                  : item.media_type === "movie"
                  ? "movies"
                  : "person";
              router.push(`/${type}/detail/${item.id}`);
            }}
          >
            {item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
              />
            ) : (
              <div className={css.iconPlaceholder}>
                <MdMovie size={252} fill="grey" />
              </div>
            )}
            <div className={css.cardInfo}>
              <h3>{item.title || item.name}</h3>
              <span>
                {(item.release_date || item.first_air_date || "").slice(0, 4)}
              </span>
              <p>{item.overview || "No description available."}</p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          setPage(newPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
