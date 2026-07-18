import { useCallback } from "react";
import { toast as toastify } from "react-toastify";

export function useToast() {
  /**
   * Show a toast notification
   * @param {Object} options
   * @param {string} [options.title] - Title of the toast
   * @param {string} [options.description] - Description/message
   * @param {"info"|"success"|"warning"|"error"} [options.status] - Type of toast
   */
  const toast = useCallback(({ title, description, status = "info" }) => {
    const message = title
      ? `${title}: ${description || ""}`
      : description || "";
    switch (status) {
      case "success":
        toastify.success(message);
        break;
      case "error":
        toastify.error(message);
        break;
      case "warning":
        toastify.warn(message);
        break;
      default:
        toastify.info(message);
    }
  }, []);

  return { toast };
}
