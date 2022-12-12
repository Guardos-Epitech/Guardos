import { ICategoryBE, ICategoryFE } from './categoryInterfaces';
export interface IDishBE {
  name: string;
  description: string;
  price: number;
  allergens: string;
  category: ICategoryBE;
}

export interface IDishFE {
  name: string;
  description: string;
  price: number;
  allergens: string;
  category: ICategoryFE;
}
