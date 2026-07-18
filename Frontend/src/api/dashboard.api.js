import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const DashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["DashboardApi"],
  endpoints: (builder) => ({
    DashboardCard: builder.query({
      query: ({id}) => ({
        url: `sales/dashboard/get/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
    useDashboardCardQuery
} = DashboardApi;
