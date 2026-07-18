import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({formData}) => ({
        url: `/user/login`,
        method: "POST",
        data: formData,
      }),
    }),

    dashboard: builder.query({
      query: () => ({
        url: `/dashboard`,
        method: "GET"
      }),
    }),

    announcement: builder.mutation({
      query: ({formData}) => ({
        url: `/news-latter/send`,
        method: "POST",
        data:formData
      }),
    }),
})
})
export const {
useLoginMutation , useDashboardQuery , useAnnouncementMutation
} = authApi;
