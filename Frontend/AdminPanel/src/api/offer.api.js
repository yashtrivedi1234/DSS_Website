import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const OFFERS_URL = "/offers";

export const offerApi = createApi({
  reducerPath: "offerApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Offer"],

  endpoints: (builder) => ({
    /* ======================
       ADMIN APIs
    ====================== */

    createOffer: builder.mutation({
      query: (formData) => ({
        url: OFFERS_URL,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Offer"],
    }),

    getAllOffers: builder.query({
      query: () => ({
        url: OFFERS_URL,
        method: "GET",
      }),
      providesTags: ["Offer"],
    }),

    getOfferById: builder.query({
      query: (id) => ({
        url: `${OFFERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Offer", id }],
    }),

    updateOffer: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${OFFERS_URL}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Offer"],
    }),

    toggleOfferStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `${OFFERS_URL}/${id}/status`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: ["Offer"],
    }),

    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `${OFFERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Offer"],
    }),

    /* ======================
       PUBLIC APIs
    ====================== */

    getActiveOffers: builder.query({
      query: () => ({
        url: `${OFFERS_URL}/active/current`,
        method: "GET",
      }),
      providesTags: ["Offer"],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useGetAllOffersQuery,
  useGetOfferByIdQuery,
  useUpdateOfferMutation,
  useToggleOfferStatusMutation,
  useDeleteOfferMutation,
  useGetActiveOffersQuery,
} = offerApi;
