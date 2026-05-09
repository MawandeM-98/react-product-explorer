import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Movie } from '../../types/movie';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieForm from '../../components/MovieForm/MovieForm';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, movies]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const handleAddMovie = async (movieData: Omit<Movie, 'id'>) => {
    setIsSubmitting(true);
    try {
      const newMovie = await api.createMovie(movieData);
      setMovies(prev => [newMovie, ...prev]);
      setShowForm(false);
      setSearchTerm('');
    } catch (err) {
      setError('Failed to add movie. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Cinema Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(226,177,59,0.05)_50%),_linear-gradient(90deg,_transparent_50%,_rgba(226,177,59,0.05)_50%)] bg-[length:40px_40px]"></div>
      </div>

      {/* Glowing dv Logo - Top Left */}
      <div className="fixed top-6 left-6 z-40">
        <div className="text-3xl font-bold text-[#e2b13b] animate-pulse tracking-wider glow-text">
          dv
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Section - Left Aligned */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
          <div className="mb-1">
            <span className="text-[#e2b13b] text-xs sm:text-sm uppercase tracking-wider font-semibold">deVere</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#e2b13b] to-[#b8860b] bg-clip-text text-transparent mb-2 sm:mb-3">
            Cinema Universe
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
            Step into the portal of timeless cinema. The greatest movies and TV shows ever made. The future of entertainment is now dv
          </p>
        </div>

        {/* Search and Add Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 max-w-7xl mx-auto">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary whitespace-nowrap"
          >
            + Add New Title
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6 max-w-7xl mx-auto">
            {error}
            <button
              onClick={fetchMovies}
              className="ml-4 text-[#e2b13b] underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No titles found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[#e2b13b] underline mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#e2b13b] to-[#b8860b] bg-clip-text text-transparent">
                  Add New Title
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#e2b13b] to-[#b8860b] mx-auto mt-2 sm:mt-3 rounded-full"></div>
              </div>
              <MovieForm
                onSubmit={handleAddMovie}
                onCancel={() => setShowForm(false)}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;