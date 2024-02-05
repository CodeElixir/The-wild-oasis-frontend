import Input from "../../ui/Input/Input";
import Spinner from "../../ui/Spinner/Spinner";
import { useSettings } from "./useSettings";
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
    updateSetting({
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
      [field]: value,
    });
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <form className="grid grid-cols-1 gap-y-6 overflow-hidden rounded-xl bg-white p-6 text-sm dark:bg-gray-900">
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
    </div>
  );
}

export default UpdateSettingsForm;
