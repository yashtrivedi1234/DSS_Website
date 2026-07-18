import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const teamApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "teamApi",
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    teamCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/team`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Team"],
    }),
    teamUpdate: builder.mutation({
      query: ({ formData ,id }) => ({
        url: `/team/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["Team"],
    }),

    getTeamById: builder.query({
      query: ({id}) => ({
        url: `/team/${id}`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),

    getAllTeam: builder.query({
      query: () => ({
        url: `/team`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),

    deleteTeam: builder.mutation({
      query: ({id}) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Team"],
    }),
  }),
});

export const { useTeamCreateMutation, useGetAllTeamQuery , useGetTeamByIdQuery, useDeleteTeamMutation , useTeamUpdateMutation } = teamApi;
