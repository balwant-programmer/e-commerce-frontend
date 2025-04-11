import { api } from "./server";
export const productApiServices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page, limit }) => ({
        url: "product/allproduct",
        params: {
          limit,
          page,
        },
        method: "GET",
      }),
    }),
    getAllProductFilter: builder.query({
      query: ({ selectedCategories, page, limit, minPrice, maxPrice }) => ({
        url: "product/allproduct",
        params: {
          page: page,
          limit: limit,
          minPrice: minPrice,
          maxPrice: maxPrice,
          selectedCategories: selectedCategories.join(","),
        },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getAllProductPrice: builder.query({
      query: ({
        selectedCategories,
        minPrice,
        maxPrice,
        searchQuery,
        emoji,
      }) => {
        return {
          url: "product/allproduct",
          params: {
            query: searchQuery,
            minPrice: minPrice,
            maxPrice: maxPrice,
            emoji: emoji,
            selectedCategories: selectedCategories.join(","),
          },
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllProductEmoji: builder.query({
      query: ({ minPrice, maxPrice, emoji }) => ({
        url: "product/allproduct",
        method: "GET",
        params: {
          minPrice,
          maxPrice,
          emoji,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllProductsearch: builder.query({
      query: (query) => ({
        url: "product/allproduct",
        method: "GET",
        params: { query },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    singleproduct: builder.query({
      query: (productId) => ({
        url: `product/singleproduct/${productId}`,
        method: "GET",
      }),
    }),

    postTheRatingAndReview: builder.mutation({
      query: ({ id, rating, review }) => ({
        url: `rating/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, review }),
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "product", id },
        "allrating",
      ],
    }),

    getSpecifUserRatingAndReview: builder.mutation({
      query: (productId) => ({
        url: `ratinguser/${productId}`,
        method: "GET",
      }),
      providesTags: ["allrating"],
    }),
    getReviewAndRatingAll: builder.query({
      query: (productId) => ({
        url: `getratingall/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "product", id: productId },
      ],
    }),

    addToCart: builder.mutation({
      query: ({ productId, quantity, price }) => {
        return {
          url: `product/addtocart`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity, price }),
        };
      },
      invalidatesTags: ["incrementCart"],
    }),
    cartdescrement: builder.mutation({
      query: ({ productId, price }) => {
        return {
          url: `product/cartdescrement`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, price }),
        };
      },
      invalidatesTags: ["cartdecrement"],
    }),

    deletedCart: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `product/deletedcart`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        };
      },
      invalidatesTags: ["deletedCart"],
    }),
    getcartItems: builder.query({
      query: () => {
        return {
          url: `product/getcart`,
          method: "GET",
        };
      },
      providesTags: [
        "cartdecrement",
        "deletedCart",
        "incrementCart",
        "loginToGetCartItem",
        "logoutToGetCartItem",
        "getCartItemData",
      ],
    }),
    createPaymentIntent: builder.mutation({
      query: (orderData) => ({
        url: "product/pay",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderData }),
      }),
    }),

    productOrder: builder.mutation({
      query: ({ crtitemData: orderData, cashOnDelevery }) => ({
        url: "product/order",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderData, cashOnDelevery }),
      }),
      invalidatesTags: ["getCartItemData"],
    }),

    getOrderProduct: builder.query({
      query: () => ({
        url: "product/getorder",
        method: "GET",
      }),
      providesTags: ["fetchTheorderData"],
    }),

    orderCancel: builder.mutation({
      query: ({ orderId, productId }) => ({
        url: `product/cancelorder/${orderId}/${productId}`,
        method: "delete",
      }),
      invalidatesTags: ["fetchTheorderData"],
    }),

    relatedProduct: builder.query({
      query: (productId) => ({
        url: `product/relatedproduct/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSpecifUserRatingAndReviewMutation,
  usePostTheRatingAndReviewMutation,
  useSingleproductQuery,
  useLazyGetAllProductsQuery,
  useGetReviewAndRatingAllQuery,
  useAddToCartMutation,
  useCartdescrementMutation,
  useDeletedCartMutation,
  useGetcartItemsQuery,
  useCreatePaymentIntentMutation,
  useProductOrderMutation,
  useGetOrderProductQuery,
  useOrderCancelMutation,
  useLazyGetAllProductFilterQuery,
  useLazyGetAllProductPriceQuery,
  useLazyGetAllProductEmojiQuery,
  useLazyGetAllProductsearchQuery,
  useRelatedProductQuery,
} = productApiServices;
