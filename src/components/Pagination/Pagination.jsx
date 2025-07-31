"use client";
import css from "../Pagination/Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const generatePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (start > 1) pages.push(1, "...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages) pages.push("...", totalPages);
    }

    return pages;
  };

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {generatePages().map((page, index) =>
        page === "..." ? (
          <span key={index} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`${css.button} ${
              page === currentPage ? css.active : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={css.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
