import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Product } from '../../types/product';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductForm from '../../components/ProductForm/ProductForm';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    try {
      const newProduct = await api.createProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
      setShowForm(false);
      setSearchTerm('');
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#0f0f23] pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f0f23] to-[#0a0a1a]">
      {/* Cyberpunk Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,243,255,0.05)_50%),_linear-gradient(90deg,_transparent_50%,_rgba(0,243,255,0.05)_50%)] bg-[length:40px_40px]"></div>
      </div>

      {/* Glowing dv Logo - Top Left */}
      <div className="fixed top-6 left-6 z-40">
        <div className="text-3xl font-bold text-cyan-400 animate-pulse tracking-wider glow-text">
          dv
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section - Aligned Left */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-2">
            <span className="text-cyan-400 text-sm uppercase tracking-wider font-semibold">deVere</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            productExplorer
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Step into the AI-driven 22nd century with deVere futuristic products
          </p>
        </div>

        {/* Search and Add Bar - Full Width, Level */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-4xl mx-auto">
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
            + Add New Product
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6 max-w-4xl mx-auto">
            {error}
            <button
              onClick={fetchProducts}
              className="ml-4 text-cyan-400 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Product Grid - 4 columns on large screens */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-cyan-400 underline mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Form Modal - Larger */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Add New Product
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
              </div>
              <ProductForm
                onSubmit={handleAddProduct}
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

export default ProductList;