import { apiSlice } from "../Api/ApiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: "/order/get-all-admin-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublisherKeys: builder.query({
      query: () => ({
        url: "/order/stripe-api-key",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amout) => ({
        url: "/order/payment",
        method: "POST",
        credentials: "include" as const,
        body: {
          amout,
        },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment }) => ({
        url: "/order/create-order",
        method: "POST",
        credentials: "include" as const,
        body: {
          courseId,
          payment,
        },
      }),
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetStripePublisherKeysQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = orderApi;
