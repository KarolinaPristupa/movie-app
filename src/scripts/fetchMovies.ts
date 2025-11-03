// scripts/fetchMovies.ts
import fs from 'fs';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_TMDB_API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';

interface MovieApiResponse {
  results?: any[];
  genres?: any[];
  [key: string]: any;
}

async function fetchData() {
  if (!API_KEY) {
    console.error('Missing VITE_TMDB_API_KEY in .env');
    process.exit(1);
  }

  const endpoints: Record<string, string> = {
    popular: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    genres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  };

  const results: Record<string, MovieApiResponse> = {};

  for (const [name, url] of Object.entries(endpoints)) {
    const { data } = await axios.get<MovieApiResponse>(url);
    results[name] = data;
  }

  const dir = './public/data';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(`${dir}/movies.json`, JSON.stringify(results, null, 2));

  console.log('Movies data saved → public/data/movies.json');
}

fetchData().catch((e) => {
  console.error('Error fetching movies:', e);
});
