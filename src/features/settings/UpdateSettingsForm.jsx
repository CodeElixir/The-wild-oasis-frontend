import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const handleUpdate = (e, field) => {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  };

  return (
    <form className="flex w-full min-w-max flex-col gap-y-6 overflow-hidden rounded-xl border-[1px] border-gray-100 bg-white px-10 py-6 text-sm sm:w-full md:w-3/4 lg:w-3/5 xl:w-2/5">
      <Input
        type="number"
        id="min-nights"
        label="Minimum nights/booking"
        defaultValue={minBookingLength}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e, "minBookingLength")}
      />
      <Input
        type="number"
        id="max-nights"
        label="Maximum nights/booking"
        defaultValue={maxBookingLength}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e, "maxBookingLength")}
      />
      <Input
        type="number"
        id="max-guests"
        label="Maximum guests/booking"
        defaultValue={maxGuestsPerBooking}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
      />
      <Input
        type="number"
        id="breakfast-price"
        label="Breakfast price"
        defaultValue={breakfastPrice}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e, "breakfastPrice")}
      />
    </form>
  );
}

export default UpdateSettingsForm;
