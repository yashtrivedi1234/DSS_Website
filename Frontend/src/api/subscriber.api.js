import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const subscriberApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "subscriberApi",
  tagTypes: ["Subscriber"],
  endpoints: (builder) => ({
    subscriberCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/news-latter`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Subscriber"],
    }),
    getAllSubscriber: builder.query({
      query: () => ({
        url: `/news-latter`,
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),
    deleteSubscriber: builder.mutation({
      query: ({ id }) => ({
        url: `/news-latter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),
  }),
});

export const {
  useSubscriberCreateMutation,
  useGetAllSubscriberQuery,
  useDeleteSubscriberMutation,
} = subscriberApi;
