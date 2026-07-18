import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const groqApi = createApi({
  reducerPath: "groqApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["GroqChat"],
  endpoints: (builder) => ({
    chatWithGroq: builder.mutation({
      query: (message) => ({
        url: "/groq/chat",
        method: "POST",
        data: { message },
      }),
      transformResponse: (response) => {
        // Ensure consistent response structure
        return {
          success: response.success,
          reply: response.data?.reply || response.reply || "",
        };
      },
      transformErrorResponse: (response) => {
        return {
          success: false,
          message:
            response.data?.message || response.message || "An error occurred",
        };
      },
      invalidatesTags: ["GroqChat"],
    }),
  }),
});

export const { useChatWithGroqMutation } = groqApi;
