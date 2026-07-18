import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const jobApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "jobApi",
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    // Create Job
    jobCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/job`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Job"],
    }),

    // Get All Jobs
    getAllJobs: builder.query({
      query: () => ({
        url: `/job`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Delete Job
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useJobCreateMutation,
  useGetAllJobsQuery,
  useDeleteJobMutation,
} = jobApi;

// Alias for compatibility with CareerPage.jsx usage
export const useCreateJobMutation = useJobCreateMutation;
