export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
}

export interface ProductFormData {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
}