import { Product } from "@prisma/client";
import { Session } from "next-auth";

export interface User {
  name: string;
  email: string;
  image?: string;
  cart: string[];
  watchlist: string[];
  purchase?: [];
  address: string[];
  Order: Order[];
}

export interface SessionType {
  update: UpdateSession;
  data: Session;
  status: string;
}

export interface CategoryWithSubCategory {
  id: string;
  name: string;
  subcategory: {
    id: string;
    name: string;
    categoryId: string;
  }[];
}

export interface Sale {
  id: string;
  title: string;
  subtitle: string | null;
  start: Date;
  expire: Date;
  method: $Enums.SaleMethod;
  value: number;
  Products: Product[];
}

export interface Product {
  id: string;
  title: string;
  type: string;
  description: string;
  rrp: string;
  price: string;
  imgUrl: string[];
  attributes?: json;
  review: string[];
  star: number[];
  delivery?: number;
  stock: number;
  category: Category;
  categoryId: string;
  subcategory?: Subcategory;
  subcategoryId?: string;
  order: Order[];
  Sale?: Sale;
  saleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDetail {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  cart: string[];
  watchlist: string[];
  purchase: Prisma.JsonValue;
  address: Prisma.JsonValue[];
  role: string;
  createdAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
  checked: boolean;
}

export interface Address {
  name: string;
  address: string;
  city: string;
  code: string;
  country: string;
  contact: string;
}

export type ProductForm = {
  title: string;
  description: string;
  type: string;
  rrp: string;
  price: string;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  saleId: string;
  delivery: number;
  imgUrl: string[];
};