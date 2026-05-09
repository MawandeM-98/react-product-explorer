export interface Movie {
  id: number;
  title: string;
  year: string | number;
  category: string;
  description: string;
  image: string;
  rating: number;
}

export interface MovieFormData {
  title: string;
  year: string | number;
  category: string;
  description: string;
  image: string;
  rating: number;
}