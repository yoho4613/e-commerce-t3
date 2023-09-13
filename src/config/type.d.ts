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
    Products: Product[]
}

export interface product {
  id: string
  title: string

}