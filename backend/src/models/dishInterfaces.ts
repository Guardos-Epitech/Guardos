import { ICategoryBE, ICategoryFE } from './categoryInterfaces';

export interface IDishBE {
  name: string;
  id: number;
  description: string;
  price: number;
  allergens: [string];
  pictures: [string];
  products: [string];
  category: ICategoryBE;
}

export interface IDishFE {
  name: string;
  description: string;
  price: number;
  allergens: [string];
  pictures: [string];
  category: ICategoryFE;
  //products [IProducts]; //WIP create IProducts
}
