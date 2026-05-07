import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      className="card cursor-pointer group"
      onClick={() => onClick(product.id)}
    >
      <div className="aspect-square overflow-hidden bg-card-bg">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white group-hover:text-neon-blue transition-colors line-clamp-1">
            {product.title}
          </h3>
          <span className="text-neon-blue font-bold">${product.price}</span>
        </div>
        <p className="text-gray-400 text-sm mb-2">{product.category}</p>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-gray-300 text-sm">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;