import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import SpinnerMini from "../../ui/Spinner/SpinnerMini";

function UpdatePasswordForm() {
  const { isUpdating, updateUser } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = ({ password, passwordConfirm }) => {
    updateUser(
      { password, passwordConfirm },
      {
        onSuccess: () => reset(),
      },
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <form
        className="grid grid-cols-1 gap-y-6 overflow-hidden rounded-xl bg-white p-6 text-sm dark:bg-gray-900 dark:bg-opacity-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="password"
          name="password"
          label="New Password (min 8 characters)"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          errors={errors}
          disabled={isUpdating}
        />
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          label="Repeat password"
          type="password"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          errors={errors}
          disabled={isUpdating}
        />
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <Button
            secondary
            type="button"
            disabled={isUpdating}
            onClick={() => {
              reset();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isUpdating}
            disabledStyles="!bg-indigo-500"
            icon={isUpdating ? <SpinnerMini /> : null}
          >
            <span>{isUpdating ? "Updating..." : "Update password"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
