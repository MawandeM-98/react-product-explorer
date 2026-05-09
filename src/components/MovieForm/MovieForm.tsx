import { useState } from 'react';
import type { FormEvent } from 'react';
import type { MovieFormData } from '../../types/movie';

interface MovieFormProps {
  onSubmit: (movie: MovieFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function MovieForm({ onSubmit, onCancel, isLoading = false }: MovieFormProps) {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    year: '',
    category: '',
    description: '',
    image: '/src/images/img7.jpeg',
    rating: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MovieFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MovieFormData, string>> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.year.toString().trim()) newErrors.year = 'Year is required';
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
      [name]: name === 'rating' ? parseFloat(value) : value,
    }));
    if (errors[name as keyof MovieFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div>
        <label className="label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          placeholder="Enter movie/TV show title"
        />
        {errors.title && <p className="text-pink-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="label">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="input"
            placeholder="Enter year of release"
          />
          {errors.year && <p className="text-pink-500 text-sm mt-1">{errors.year}</p>}
        </div>

        <div>
          <label className="label">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
            placeholder="Crime / Drama, TV Series, etc."
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
          placeholder="Enter movie/TV show description"
        />
        {errors.description && <p className="text-pink-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input"
            placeholder="/src/images/your-image.jpeg"
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
            placeholder="4.8"
            step="0.1"
            min="0"
            max="5"
          />
          {errors.rating && <p className="text-pink-500 text-sm mt-1">{errors.rating}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : 'Add Title'}
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

export default MovieForm;