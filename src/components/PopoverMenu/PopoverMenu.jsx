import css from './PopoverMenu.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import en from "date-fns/locale/en-GB";

export default function PopoverMenu({
  filters,
  sort,
  onSortChange,
  onCheckboxFilterChange,
  onDateFilterChange,
  onSearch,
  isFilterApplied,
  genres,
  selectedGenres,
  onGenreChange,
}) {
  return (
    <aside className={css.sidebar}>
      {/* Sort */}
      <div className={css.block}>
        <h3>Sort</h3>
        <select onChange={onSortChange} value={sort}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
          <option value="title.asc">Title (A-Z)</option>
          <option value="title.desc">Title (Z-A)</option>
        </select>
      </div>

      {/* Filters */}
      <div className={css.block}>
        <h3>Filters</h3>
        <label>
          <input
            type="checkbox"
            name="rating"
            checked={filters.rating}
            onChange={onCheckboxFilterChange}
          /> High Rating (7+)
        </label>
        <label>
          <input
            type="checkbox"
            name="popularity"
            checked={filters.popularity}
            onChange={onCheckboxFilterChange}
          /> High Popularity
        </label>
        <label>
          <input
            type="checkbox"
            name="favorites"
            checked={filters.favorites}
            onChange={onCheckboxFilterChange}
          /> My Favorites
        </label>

        <div>
          <h3>Start Date:</h3>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => onDateFilterChange("startDate", date)}
            locale={en}
            dateFormat="dd.MM.yyyy"
            placeholderText="dd.mm.yyyy"
            className={css.dateInput}
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </div>

        <div>
          <h3>End Date:</h3>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => onDateFilterChange("endDate", date)}
            locale={en}
            dateFormat="dd.MM.yyyy"
            placeholderText="dd.mm.yyyy"
            className={css.dateInput}
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </div>
      </div>

      {/* Genres */}
      <div className={css.block}>
        <h3>Genres</h3>
        <div className={css.genreList}>
          {genres.map((genre) => (
            <label key={genre.id}>
              <input
                type="checkbox"
                value={genre.id}
                checked={selectedGenres.includes(genre.id)}
                onChange={onGenreChange}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className={css.searchButton}
        onClick={onSearch}
        disabled={!isFilterApplied}
        style={{
          backgroundColor: isFilterApplied ? '#01b4e4' : '#ccc',
          cursor: isFilterApplied ? 'pointer' : 'not-allowed'
        }}
      >
        Search
      </button>
    </aside>
  );
}
