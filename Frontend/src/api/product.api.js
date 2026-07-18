import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const  productApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: " productApi",
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    productCreate: builder.mutation({
      query: ({ formData }) => ({
        url: `/product`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    productUpdate: builder.mutation({
      query: ({ formData ,id }) => ({
        url: `/product/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: ({id}) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `/product`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: ({id}) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Product"],
    }),

    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/product/slug/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useProductCreateMutation,useGetProductBySlugQuery, useGetAllProductsQuery , useGetProductByIdQuery, useDeleteProductMutation , useProductUpdateMutation } =  productApi;
