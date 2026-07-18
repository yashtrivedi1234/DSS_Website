import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const galleryApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "galleryApi",
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
   galleryCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/gallery`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Gallery"],
    }),
   galleryUpdate: builder.mutation({
      query: ({ formData ,id }) => ({
        url: `/gallery/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["Gallery"],
    }),

    getGalleryById: builder.query({
      query: ({id}) => ({
        url: `/gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),

    getAllGallery: builder.query({
      query: () => ({
        url: `/gallery`,
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),

    deleteGallery: builder.mutation({
      query: ({id}) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Gallery"],
    }),
  }),
});

export const { useGalleryCreateMutation, useGetAllGalleryQuery , useGetGalleryByIdQuery, useDeleteGalleryMutation , useGalleryUpdateMutation } = galleryApi;
