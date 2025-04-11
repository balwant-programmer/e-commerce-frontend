import { api } from "./server";

const userAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (formData) => ({
        url: "user/register",
        method: "POST",
        body: formData,
      }),
    }),

    login: builder.mutation({
      query: (formData) => {
        return {
          url: "user/login",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "User", id: "auth" }, "loginToGetCartItem"],
    }),

    CreateuserAddress: builder.mutation({
      query: ({ houseno, zipCode, phone, address }) => {
        return {
          url: "user/address",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ houseno, zipCode, phone, address }),
        };
      },
      invalidatesTags: ["userAddress", "getorderDataFetch"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "User", id: "auth" }, "logoutToGetCartItem"],
    }),

    checkUserAuth: builder.query({
      query: () => ({
        url: "user/checkauth",
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "auth" }, "userAddress"],
    }),

    userLogo: builder.mutation({
      query: (formdataUserImage) => ({
        url: "user/userlogo",
        method: "POST",
        body: formdataUserImage,
      }),
      invalidatesTags: [{ type: "User", id: "auth" }],
    }),

    userprfileupdate: builder.mutation({
      query: ({ username, email }) => ({
        url: "user/userprofileupdate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      }),
      invalidatesTags: [{ type: "User", id: "auth" }, "userAddress"],
    }),

    sendotp: builder.mutation({
      query: ({ email }) => ({
        url: "user/otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }),
    }),
    veryFiedOtp: builder.mutation({
      query: ({ email, newpassword, otp }) => ({
        url: "user/varifyotp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newpassword, otp }),
      }),
    }),

    userwishlistcreate: builder.mutation({
      query: (productId) => ({
        url: `user/wishlist/${productId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }),
      invalidatesTags: [{ type: "User", id: "auth" }, "wishlistproduct"],
    }),

    userwishlistGet: builder.query({
      query: () => ({
        url: `user/wishlistget`,
        method: "GET",
      }),
      providesTags: ["wishlistproduct"],
    }),
  }),

  tagTypes: ["User"],
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckUserAuthQuery,
  useLogoutMutation,
  useUserLogoMutation,
  useCreateuserAddressMutation,
  useUserprfileupdateMutation,
  useSendotpMutation,
  useVeryFiedOtpMutation,
  useUserwishlistcreateMutation,
  useUserwishlistGetQuery,
} = userAuthApi;
