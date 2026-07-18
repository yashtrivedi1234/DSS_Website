import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery.js";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Client"],

  endpoints: (builder) => ({
    /* =====================
       CREATE CLIENT
    ===================== */
    createClient: builder.mutation({
      query: (formData) => ({
        url: "/client",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Client"],
    }),

    /* =====================
       GET ALL CLIENTS
    ===================== */
    getAllClients: builder.query({
      query: () => ({
        url: "/client",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),

    /* =====================
       GET CLIENT BY ID
    ===================== */
    getClientById: builder.query({
      query: (id) => ({
        url: `/client/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Client", id }],
    }),

    /* =====================
       UPDATE CLIENT
    ===================== */
    updateClient: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/client/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["Client"],
    }),

    /* =====================
       DELETE CLIENT
    ===================== */
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
