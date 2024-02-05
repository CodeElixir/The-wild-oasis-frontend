export const BASE_URL = "http://localhost:8080/api/v1/";

export const handleApiError = (e) => {
  const data = e.response?.data;
  if (data) {
    throw new Error(data.errorMessage);
  }
  throw new Error(e.message);
};
