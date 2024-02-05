import { handleApiError } from "./axios.js";

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

  const formData = new FormData();
  formData.append("file", avatar);
  try {
    await axiosPrivate.post(`/users/uploadAvatar/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
