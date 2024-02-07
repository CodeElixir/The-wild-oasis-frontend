export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handleApiError = (e) => {
  const data = e.response?.data;
  if (data) {
    throw new Error(data.errorMessage);
  }
  throw new Error(e.message);
};
