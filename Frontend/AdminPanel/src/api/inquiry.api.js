import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const inquiryApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "inquiryApi",
  tagTypes: ["Inquiry"],
  endpoints: (builder) => ({
    inquiryCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/inquiry`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Inquiry"],
    }),

    getAllInquiry: builder.query({
      query: () => ({
        url: `/inquiry`,
        method: "GET",
      }),
      providesTags: ["Inquiry"],
    }),

    deleteInquiry: builder.mutation({
      query: ({id}) => ({
        url: `/inquiry/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const { useInquiryCreateMutation, useGetAllInquiryQuery , useDeleteInquiryMutation } = inquiryApi;
