import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const jobApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "jobApi",
  tagTypes: ["job"],
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (formData) => ({
        url: `/job`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["job"],
    }),
    getAllJobs: builder.query({
      query: () => ({
        url: `/job`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),

  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useDeleteJobMutation,
} = jobApi;
