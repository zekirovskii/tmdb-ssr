import css from './PopoverMenu.module.css';

export default function PopoverMenu({ filters, sort, onSortChange, onFilterChange, onSearch, isFilterApplied ,genres,
  selectedGenres,
  onGenreChange,}) {
  return (
    <aside className={css.sidebar}>
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

      <div className={css.block}>
        <h3>Filters</h3>
        <label>
          <input
            type="checkbox"
            name="rating"
            checked={filters.rating}
            onChange={onFilterChange}
          /> High Rating (7+)
        </label>
        <label>
          <input
            type="checkbox"
            name="popularity"
            checked={filters.popularity}
            onChange={onFilterChange}
          /> High Popularity
        </label>
        <label>
          <input
            type="checkbox"
            name="favorites"
            checked={filters.favorites}
            onChange={onFilterChange}
          /> My Favorites
        </label>
        <label>
          <h3>Start Date:</h3>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onFilterChange}
          />
        </label>
        <label>
          <h3>End Date:</h3>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onFilterChange}
          />
        </label>
          </div>
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
