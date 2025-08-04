export function getFormattedTitle(type, category) {
  const typeMap = {
    movies: 'Movies',
    tvshows: 'Tv Shows',
  };

  const categoryMap = {
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming',
    on_the_air: 'On The Air',
  };

  const formattedType = typeMap[type] || type;
  const formattedCategory = categoryMap[category] || category;

  return `${formattedCategory} ${formattedType}`;
}

