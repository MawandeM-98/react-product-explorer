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
      <div className="min-h-screen bg-dark-bg pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
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
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="text-neon-blue hover:text-neon-purple transition-colors mb-6 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        {/* Product Details */}
        <div className="card max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 p-6">
              <div className="aspect-square overflow-hidden rounded-lg bg-card-bg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-white">{product.title}</h1>
                <span className="text-2xl font-bold text-neon-blue">
                  ${product.price}
                </span>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white">{product.rating}</span>
                </div>
                <span className="text-gray-400">/ 5.0</span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
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
  );
}

export default ProductDetail;