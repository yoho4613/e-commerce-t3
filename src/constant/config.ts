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
  address: [],
  role: "customer",
  createdAt: new Date(),
};
