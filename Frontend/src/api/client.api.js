import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        url: "/client",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
  }),
});

export const { useGetAllClientsQuery } = clientApi;
