import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const subscriberApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "subscriberApi",
  tagTypes: ["subscriber"],
  endpoints: (builder) => ({
    subscriberCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/news-latter`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["subscriber"],
    }),

    getAllsubscriber: builder.query({
      query: () => ({
        url: `/news-latter`,
        method: "GET",
      }),
      providesTags: ["subscriber"],
    }),

    deleteSubscriber: builder.mutation({
      query: ({id}) => ({
        url: `/news-latter/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["subscriber"],
    }),

    toggleSubscriberStatus: builder.mutation({
      query: ({id}) => ({
        url: `/news-latter/status/${id}`,
        method: "POST",
      }),
       invalidatesTags: ["subscriber"],
    }),
  }),
});

export const { useSubscriberCreateMutation, useGetAllsubscriberQuery ,  useDeleteSubscriberMutation , useToggleSubscriberStatusMutation} = subscriberApi;
