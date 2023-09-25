export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const defaultUserDetail = {
  id: "",
  name: "",
  email: "",
  image: "",
  cart: [],
  emailVerified: null,
  watchlist: [],
  purchase: [],
  address: null,
  role: "customer",
  createdAt: new Date(),
};

export const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const initialProductForm = {
  id: "",
  title: "",
  description: "",
  type: "",
  rrp: "",
  price: "",
  stock: 0,
  categoryId: "",
  subcategoryId: "",
  saleId: "",
  delivery: 0,
  imgUrl: [],
  attributes: {},
  createdAt: new Date(),
  updatedAt: new Date(),
};