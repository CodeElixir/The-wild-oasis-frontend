import { handleApiError } from "./axios.js";

export async function getCabins(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.get(`/cabins/`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function createEditCabin(
  axiosPrivate,
  { id, cabinData, imageId },
) {
  const hasImageId = typeof cabinData.image === "string";

  // 1. Create/Edit cabin
  let data;
  let cabinId = id;

  if (id) {
    // Edit
    try {
      const { data: response } = await axiosPrivate.patch(`/cabins/update`, {
        ...cabinData,
        id,
        image: imageId,
      });
      data = response;
    } catch (e) {
      handleApiError(e);
    }
  } else {
    // Create
    try {
      const { data: response } = await axiosPrivate.post(`/cabins/save`, {
        ...cabinData,
        image: "",
      });
      data = response;
      cabinId = data.id;
    } catch (e) {
      handleApiError(e);
    }
  }

  // 2. Upload image
  if (!hasImageId) {
    const formData = new FormData();
    formData.append("file", cabinData.image);
    try {
      await axiosPrivate.post(`/cabins/uploadImage/${cabinId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      // 3. Delete cabin in case image upload fails
      if (!id) {
        await deleteCabin(axiosPrivate, data.id);
      }
      handleApiError(e);
    }
  }

  return data;
}

export async function deleteCabin(axiosPrivate, id) {
  try {
    const { data } = await axiosPrivate.delete(`/cabins/delete/${id}`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}
