import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  } else return data;
}

export async function createEditCabin({ id, cabinData }) {
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
  let query = supabase.from("cabins");

  if (id) {
    // Edit
    query = query.update({ ...cabinData, image: imageUrl }).eq("id", id);
  } else {
    // Create
    query = query.insert([{ ...cabinData, image: imageUrl }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created.");
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

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted.");
  }
}
