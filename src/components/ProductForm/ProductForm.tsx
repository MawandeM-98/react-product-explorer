import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ProductFormData } from '../../types/product';

interface ProductFormProps {
  onSubmit: (product: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ProductForm({ onSubmit, onCancel, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    rating: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value,
    }));
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="label">Product Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          placeholder="Enter product title"
        />
        {errors.title && <p className="text-pink-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            className="input"
            placeholder="0.00"
            step="0.01"
          />
          {errors.price && <p className="text-pink-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="label">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
            placeholder="e.g., Electronics, Audio"
          />
          {errors.category && <p className="text-pink-500 text-sm mt-1">{errors.category}</p>}
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          rows={4}
          placeholder="Enter product description"
        />
        {errors.description && <p className="text-pink-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input"
            placeholder="/images/product.jpeg"
          />
          {errors.image && <p className="text-pink-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <div>
          <label className="label">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating || ''}
            onChange={handleChange}
            className="input"
            placeholder="4.5"
            step="0.1"
            min="0"
            max="5"
          />
          {errors.rating && <p className="text-pink-500 text-sm mt-1">{errors.rating}</p>}
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;