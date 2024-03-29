import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import Button from "../ui/Button/Button";
import { subtractDates } from "../utils/helpers";
import { handleApiError } from "../services/axios.js";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { useAxios } from "../context/AxiosContext.jsx";
import { deleteCabin } from "../services/apiCabins.js";
import axios from "axios";
import { updateSetting } from "../services/apiSettings.js";

const originalSettings = {
  minBookingLength: 3,
  maxBookingLength: 30,
  maxGuestsPerBooking: 10,
  breakfastPrice: 15,
};

async function deleteGuests(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.delete("/guests/delete");
    return data;
  } catch (e) {
    console.log(e.message);
    handleApiError(e);
  }
}

async function deleteCabins(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.delete("/cabins/delete");
    return data;
  } catch (e) {
    console.log(e.message);
    handleApiError(e);
  }
}

async function deleteBookings(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.delete("/bookings/delete");
    return data;
  } catch (e) {
    console.log(e.message);
    handleApiError(e);
  }
}

async function createGuests(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.post(`/guests/saveAll`, guests);
    return data;
  } catch (e) {
    console.log(e.message);
    handleApiError(e);
  }
}

async function createCabins(axiosPrivate) {
  try {
    const { data } = await axiosPrivate.post(`/cabins/saveAll`, cabins);
    if (data && data.length > 0) {
      for (const cabin of data) {
        await uploadCabinImage(axiosPrivate, cabin.id, cabin.name);
      }
    }
    return data;
  } catch (e) {
    console.log(e.message);
    handleApiError(e);
  }
}

async function uploadCabinImage(axiosPrivate, cabinId, cabinName) {
  try {
    const response = await axios.get(`../cabins/cabin-${cabinName}.jpg`, {
      responseType: "blob",
    });
    const formData = new FormData();
    formData.append("file", response.data);
    try {
      await axiosPrivate.post(`/cabins/uploadImage/${cabinId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      // 3. Delete cabin in case image upload fails
      await deleteCabin(axiosPrivate, cabinId);
      handleApiError(e);
    }
  } catch (e) {
    console.error(e);
  }
}

async function createBookings(axiosPrivate) {
  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    // const guest = guests.at(booking.guestId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guests: {
        id: booking.guestId,
      },
      cabins: {
        id: booking.cabinId,
      },
      status,
    };
  });

  console.log(finalBookings);

  try {
    const { data } = await axiosPrivate.post(
      `/bookings/saveAll`,
      finalBookings,
    );
    return data;
  } catch (e) {
    console.log(e.message);
    handleApiError(e);
  }
}

function Uploader() {
  const { axiosPrivate } = useAxios();

  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings(axiosPrivate);
    await deleteGuests(axiosPrivate);
    await deleteCabins(axiosPrivate);

    // Bookings need to be created LAST
    await createGuests(axiosPrivate);
    await createCabins(axiosPrivate);
    await createBookings(axiosPrivate);

    await updateSetting(axiosPrivate, originalSettings);
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 className="text-gray-900">SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
