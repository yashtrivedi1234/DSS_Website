import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const blogApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "blogApi",
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    blogCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/blog`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Blog"],
    }),
    blogUpdate: builder.mutation({
      query: ({ formData ,id }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    getBlogById: builder.query({
      query: ({id}) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: `/blog`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: ({id}) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Blog"],
    }),
  }),
});

export const { useBlogCreateMutation, useGetAllBlogsQuery , useGetBlogByIdQuery, useDeleteBlogMutation , useBlogUpdateMutation } = blogApi;
