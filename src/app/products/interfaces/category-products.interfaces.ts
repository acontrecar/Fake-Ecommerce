import { Product } from './productsByCategory.interface';

export interface CategoryProducts {
  category: string;
  products: Product[];
}

export interface CategoriesResponse {
  slug: string;
  name: string;
  url: string;
}
