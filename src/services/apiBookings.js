import { PAGE_SIZE } from "../utils/constants";
import { handleApiError } from "./axios.js";

export async function getBookings(
  axiosPrivate,
  { filter, sortBy, currentPage },
) {
  try {
    const { data } = await axiosPrivate.post("/bookings/", {
      status: filter?.value,
      sortProperties: [sortBy.field],
      sortDirection: sortBy.direction,
      pageSize: PAGE_SIZE,
      pageNo: currentPage,
    });
    return { data: data.bookings, count: data.count };
  } catch (e) {
    handleApiError(e);
  }
}

export async function getBooking(axiosPrivate, id) {
  try {
    const { data } = await axiosPrivate.get(`/bookings/${id}`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(axiosPrivate, date) {
  try {
    const { data } = await axiosPrivate.get(`/bookings/after?dateTime=${date}`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(axiosPrivate, date) {
  try {
    const { data } = await axiosPrivate.get(
      `/bookings/staysAfter?dateTime=${date}`,
    );
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.get(`/bookings/staysTodayActivity`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function updateBooking(axiosPrivate, booking) {
  try {
    const { data } = await axiosPrivate.post(`/bookings/update`, booking);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function deleteBooking(axiosPrivate, id) {
  try {
    const { data } = await axiosPrivate.delete(`/bookings/delete/${id}`);
    return data;
  } catch (e) {
    handleApiError(e);
  }
}
