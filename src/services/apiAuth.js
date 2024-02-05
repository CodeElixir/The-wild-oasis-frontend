import { handleApiError } from "./axios.js";
import supabase, { supabaseUrl } from "./supabase.js";

export async function signup(
  axiosPrivate,
  { fullName, email, password, passwordConfirm },
) {
  try {
    const { data } = await axiosPrivate.post("/users/register", {
      email,
      fullName,
      password,
      confirmPassword: passwordConfirm,
      avatar: "",
      role: "USER",
    });
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function login(axiosPublic, { email, password }) {
  try {
    const { data } = await axiosPublic.post("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function getCurrentUser(axiosPrivate, id) {
  try {
    if (!id) return null;
    const { data } = await axiosPrivate.get(`/users/${id}`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function updateCurrentUser(
  axiosPrivate,
  { id, password, passwordConfirm, fullName, avatar },
) {
  // 1. Update fullName or password(not both)
  let updateData;
  if (password) {
    updateData = {
      newPassword: password,
      confirmationPassword: passwordConfirm,
    };
  } else if (fullName) {
    updateData = {
      fullName,
    };
  }

  let responseData;
  if (password) {
    try {
      const { data } = await axiosPrivate.post(
        `/users/changePassword`,
        updateData,
      );
      responseData = data;
    } catch (e) {
      handleApiError(e);
    }
  } else {
    try {
      if (!id) return null;
      const { data } = await axiosPrivate.post(
        `/users/update/${id}`,
        updateData,
      );
      responseData = data;
    } catch (e) {
      handleApiError(e);
    }
  }

  if (!avatar) return responseData;

  // 2. Upload avatar in avatar bucket
  const fileName = `avatar-${responseData.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3. Update avatar in user
  try {
    if (!id) return null;
    const { data } = await axiosPrivate.post(`/users/update/${id}`, {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    });
    responseData = data;
  } catch (e) {
    handleApiError(e);
  }

  return responseData;
}

export async function logout(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.post(`auth/logout`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function getCsrf(axiosPublic) {
  try {
    const { data } = await axiosPublic.get(`auth/csrf`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}
