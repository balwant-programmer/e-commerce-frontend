import { api } from "./server";
const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategory: builder.query({
      query: (subcategoryname) => {
        return {
          url: `product/subcategoryproduct/${subcategoryname}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        if (response && Array.isArray(response.subcategoryproduct)) {
          return response.subcategoryproduct;
        }
        return [];
      },
      transformErrorResponse: (error) => {
        return {
          errorMessage:
            "Failed to fetch subcategory data. Please try again later.",
          errorDetails: error?.message || "Unknown error",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSubcategoryQuery, useLazyGetSubcategoryQuery } =
  productApi;
