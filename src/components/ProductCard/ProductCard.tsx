import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: number) => void;
}

function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <div className="card group cursor-pointer">
      <div className="aspect-square overflow-hidden bg-white/5">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <span className="text-cyan-400 font-bold bg-cyan-400/10 px-2 py-1 rounded">
            ${product.price}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300 text-sm">{product.rating}</span>
          </div>
          <button
            onClick={() => onViewDetails(product.id)}
            className="btn-details"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;