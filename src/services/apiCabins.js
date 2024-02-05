import supabase, { supabaseUrl } from "./supabase";
import { handleApiError } from "./axios.js";

export async function getCabins(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.get(`/cabins/`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function createEditCabin(axiosPrivate, { id, cabinData }) {
  const hasImageUrl =
    typeof cabinData.image === "string" &&
    cabinData.image?.startsWith(supabaseUrl);

  let imageName;
  let imageUrl;
  if (hasImageUrl) {
    imageUrl = cabinData.image;
  } else {
    imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll("/", "");
    imageUrl = hasImageUrl
      ? cabinData.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Create/Edit cabin

  let data;
  if (id) {
    // Edit
    try {
      const { data: response } = await axiosPrivate.patch(`/cabins/update`, {
        ...cabinData,
        id,
        image: imageUrl,
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
        image: imageUrl,
      });
      data = response;
    } catch (e) {
      handleApiError(e);
    }
  }

  if (!hasImageUrl) {
    // 2. Upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    // 3. Delete cabin in case image upload fails
    if (storageError) {
      await deleteCabin(data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created.",
      );
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
