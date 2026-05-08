import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Product } from '../../types/product';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProduct(parseInt(id!));
      setProduct(data);
    } catch (err) {
      setError('Failed to load product details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#0f0f23] pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#0f0f23] pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error || 'Product not found'}
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f0f23] to-[#0a0a1a]">
      {/* Cyberpunk Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,243,255,0.05)_50%),_linear-gradient(90deg,_transparent_50%,_rgba(0,243,255,0.05)_50%)] bg-[length:40px_40px]"></div>
      </div>

      {/* Glowing dv Logo */}
      <div className="fixed top-6 left-6 z-40">
        <div className="text-3xl font-bold text-cyan-400 animate-pulse tracking-wider glow-text">
          dv
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="text-cyan-400 hover:text-purple-400 transition-colors mb-6 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        {/* Product Details */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl max-w-5xl mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 p-8 bg-white/5">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {product.title}
                    </h1>
                    <span className="text-2xl font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg">
                      ${product.price}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xl">★</span>
                      <span className="text-white text-lg">{product.rating}</span>
                    </div>
                    <span className="text-gray-400">/ 5.0</span>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3 uppercase tracking-wider">Description</h3>
                    <p className="text-gray-300 leading-relaxed">{product.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/')}
                  className="btn-primary w-full"
                >
                  Browse More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;