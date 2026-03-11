import { AxiosError } from "axios";

/**
 * Extracts a user-friendly error message from an API error.
 * Prioritises the `detail` field from the response body (Django REST style),
 * then falls back to the generic axios message, then a default fallback.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;

    if (typeof data === "string") return data;
    if (typeof data.detail === "string") return data.detail;
    if (typeof data.message === "string") return data.message;
    if (Array.isArray(data.detail)) return data.detail.join(", ");
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
