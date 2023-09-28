import { Product } from './productsByCategory.interface';

export interface CategoryProducts {
  category: string;
  products: Product[];
}
