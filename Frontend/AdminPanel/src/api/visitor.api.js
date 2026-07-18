import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const visitorApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "visitorApi",
  tagTypes: ["Visitor"],
  endpoints: (builder) => ({
    visitorCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/visitor`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Visitor"],
    }),

    getAllVisitor: builder.query({
      query: () => ({
        url: `/visitor`,
        method: "GET",
      }),
      providesTags: ["Visitor"],
    }),

    deleteVisitor: builder.mutation({
      query: ({id}) => ({
        url: `/visitor/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Visitor"],
    }),
  }),
});

export const { useVisitorCreateMutation, useGetAllVisitorQuery ,  useDeleteVisitorMutation} = visitorApi;
