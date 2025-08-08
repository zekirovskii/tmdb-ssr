import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';

// UI --> TMDB
const typeMap = {
  movies: "movie",
  movie: "movie",
  tvshows: "tv",
  tv: "tv",
};


// Hero --> Background
export const fetchTrending = async (timeWindow = "day") => {
  const response = await axios.get(`${BASE_URL}/trending/all/${timeWindow}`, {
    params: { api_key: API_KEY }
  });
  return response.data.results;
};

// Search 
export async function searchItem(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await res.json();
  return {
    results: data.results,
    totalPages: data.total_pages
  };
}

// Latest Trailers
export const fetchTrailersByCategory = async (category = "popular") => {
  let endpoint;
  let type = "movie"; // default

  switch (category) {
    case "streaming":
      endpoint = "/movie/now_playing";
      type = "movie";
      break;
    case "on_tv":
      endpoint = "/tv/on_the_air";
      type = "tv";
      break;
    case "for_rent":
      endpoint = "/movie/upcoming";
      type = "movie";
      break;
    case "in_theaters":
      endpoint = "/movie/now_playing";
      type = "movie";
      break;
    default:
      endpoint = "/movie/popular";
      type = "movie";
  }

  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    params: { api_key: API_KEY, language: "en-US" }
  });

  return response.data.results.map(item => ({
    ...item,
    media_type: type
  }));
};


// Whats Popular
export const fetchWhatsPopular = async (type = "movie") => {
  const res = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  console.log("Whats Popular API:", data.results);
  return data.results;
};



// Category Page
export async function fetchMoviesOrTvByCategory(type, category) {
  const mappedType = typeMap[type] || type;

  const url = `${BASE_URL}/${mappedType}/${category}?api_key=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}

// Details
export async function fetchDetailsById(type, id) {
  const mappedType = typeMap[type] || type;

  const url = `${BASE_URL}/${mappedType}/${id}?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  return await res.json();
}

// Actors 
export async function fetchCreditsById(type, id) {
  const mappedType = typeMap[type] || type;

  const url = `${BASE_URL}/${mappedType}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  return await res.json();
}

// Trailer
export async function fetchVideosById(type, id) {
  if (!type) {
    console.warn(`fetchVideosById: 'type' is missing for id ${id}`);
    return { results: [] };
  }

  const mappedType = typeMap[type] || type;
  if (!mappedType) {
    console.warn(`fetchVideosById: 'mappedType' not found for type ${type}`);
    return { results: [] };
  }

  const url = `${BASE_URL}/${mappedType}/${id}/videos?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  return await res.json();
}


// Genre
export async function fetchGenres(type) {
 
  const mappedType = typeMap[type] || type;

  const res = await fetch(`${BASE_URL}/genre/${mappedType}/list?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.genres;
}