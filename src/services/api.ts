import type { Movie, MovieFormData } from '../types/movie';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  // Get all movies/shows
  async getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  // Get single movie by ID
  async getMovie(id: number): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
  },

  // Create new movie/TV show
  async createMovie(movie: MovieFormData): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to create movie');
    return response.json();
  },
};