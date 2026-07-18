import axios from "axios";

// Render-specific backend instance. Prefer env var `VITE_BACKEND_URL_JOBS`.
// Fallback to `VITE_BACKEND_URL` then to a safe hard-coded default.
const RENDER_BACKEND =
  import.meta.env.VITE_BACKEND_URL_JOBS ??
  import.meta.env.VITE_BACKEND_URL ??
  "https://dss-backend-qnvh.onrender.com/api/v1";

export const renderAxiosInstance = axios.create({
  baseURL: RENDER_BACKEND,
  withCredentials: true,
  credentials: "include",
});

export const renderAxiosBaseQuery =
  ({ baseUrl = "" } = {}) =>
  async ({ url, method, data, responseType }) => {
    try {
      const isFormData = data instanceof FormData;
      const response = await renderAxiosInstance({
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
      console.log(err?.data?.message || "Something went wrong");

      return {
        error: {
          status: err?.status || 500,
          data: err?.data || axiosError.message,
        },
      };
    }
  };
