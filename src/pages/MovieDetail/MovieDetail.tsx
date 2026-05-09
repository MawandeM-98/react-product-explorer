import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Movie } from '../../types/movie';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMovie(parseInt(id!));
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error || 'Movie not found'}
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Cinema Universe
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Cinema Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(226,177,59,0.05)_50%),_linear-gradient(90deg,_transparent_50%,_rgba(226,177,59,0.05)_50%)] bg-[length:40px_40px]"></div>
      </div>

      {/* Glowing dv Logo */}
      <div className="fixed top-6 left-6 z-40">
        <div className="text-3xl font-bold text-[#e2b13b] animate-pulse tracking-wider glow-text">
          dv
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="text-[#e2b13b] hover:text-[#b8860b] transition-colors mb-6 flex items-center gap-2"
        >
          ← Back to Cinema Universe
        </button>

        {/* Movie Details */}
        <div className="bg-[#1e1e2e]/80 backdrop-blur-sm rounded-2xl border border-[#e2b13b]/20 shadow-2xl max-w-5xl mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-2/5 p-6 md:p-8 bg-[#1a1a2e]">
              <div className="aspect-[2/3] overflow-hidden rounded-xl">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#e2b13b] to-[#b8860b] bg-clip-text text-transparent">
                      {movie.title}
                    </h1>
                    <span className="text-xl sm:text-2xl font-bold text-[#e2b13b] bg-[#e2b13b]/10 px-3 py-1 rounded-lg">
                      {movie.year}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#e2b13b]/20 text-[#e2b13b] rounded-full text-sm border border-[#e2b13b]/30">
                      {movie.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      <span className="text-[#e2b13b] text-xl">★</span>
                      <span className="text-white text-lg">{movie.rating}</span>
                    </div>
                    <span className="text-gray-400">/ 5.0</span>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#e2b13b] mb-3 uppercase tracking-wider">Synopsis</h3>
                    <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/')}
                  className="btn-primary w-full"
                >
                  Explore More Titles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;