import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  tagTypes: [
    "cartdecrement",
    "incrementCart",
    "deletedCart",
    "loginToGetCartItem",
    "logoutToGetCartItem",
    "userAddress",
  ],
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.18:5173/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
