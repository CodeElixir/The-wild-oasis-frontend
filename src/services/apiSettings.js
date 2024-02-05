import { handleApiError } from "./axios.js";

export async function getSettings(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.get(`/settings/`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(axiosPrivate, newSetting) {
  try {
    const { data } = await axiosPrivate.patch(`/settings/update`, {
      id: 1,
      ...newSetting,
    });
    return data;
  } catch (e) {
    handleApiError(e);
  }
}
