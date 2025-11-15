export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  url: string;
  categoryId: string | null;
  createdAt: string;
  category?: Category | null;
}
