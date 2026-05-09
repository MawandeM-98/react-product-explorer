import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  onViewDetails: (id: number) => void;
}

function MovieCard({ movie, onViewDetails }: MovieCardProps) {
  return (
    <div className="card group cursor-pointer">
      <div className="aspect-[2/3] overflow-hidden bg-[#1e1e2e]">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#e2b13b] transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <span className="text-[#e2b13b] font-bold text-sm bg-[#e2b13b]/10 px-2 py-1 rounded">
            {movie.year}
          </span>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mb-3">{movie.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[#e2b13b]">★</span>
            <span className="text-gray-300 text-sm">{movie.rating}</span>
          </div>
          <button
            onClick={() => onViewDetails(movie.id)}
            className="btn-details"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;