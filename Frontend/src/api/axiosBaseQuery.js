import axios from "axios";
import { toast } from "react-toastify";

const DEFAULT_BACKEND =
  import.meta.env.VITE_BACKEND_URL ?? "https://db.dssup.in/api/v1";

export const axiosInstance = axios.create({
  baseURL: DEFAULT_BACKEND,
  withCredentials: true,
  credentials: "include",
});

export const axiosBaseQuery =
  ({ baseUrl = "" } = {}) =>
  async ({ url, method, data, responseType }) => {
    try {
      const isFormData = data instanceof FormData;
      console.log(isFormData);
      const response = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        responseType: responseType || "json",
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      });

      return { data: response.data };
    } catch (axiosError) {
      const err = axiosError.response;
      // toast.error(err?.data?.message || 'Something went wrong');
      console.log(err?.data?.message || "Something went wrong");

      return {
        error: {
          status: err?.status || 500,
          data: err?.data || axiosError.message,
        },
      };
    }
  };
