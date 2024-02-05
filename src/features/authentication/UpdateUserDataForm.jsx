import { useForm } from "react-hook-form";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Input from "../../ui/Input/Input";
import FileInput from "../../ui/Input/FileInput";
import Button from "../../ui/Button/Button";
import SpinnerMini from "../../ui/Spinner/SpinnerMini";

function UpdateUserDataForm() {
  const {
    user: { id, email, fullName: currentFullName },
  } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: email, fullName: currentFullName, avatar: null },
  });

  const onSubmit = ({ fullName, avatar }) => {
    updateUser(
      { id, fullName: fullName.trim(), avatar: avatar && avatar[0] },
      {
        onSuccess: () =>
          reset({ email: email, fullName: fullName.trim(), avatar: null }),
      },
    );
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <form
          className="grid grid-cols-1 gap-y-6 overflow-hidden rounded-xl bg-white p-6 text-sm dark:bg-gray-900 dark:bg-opacity-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="email"
            name="email"
            label="Email address"
            type="email"
            {...register("email", {
              required: "This field is required.",
            })}
            errors={errors}
            disabled
          />
          <Input
            id="fullName"
            name="fullName"
            label="Full name"
            type="text"
            {...register("fullName", {
              required: "This field is required.",
            })}
            errors={errors}
            disabled={isUpdating}
          />
          <FileInput
            id="avatar"
            name="avatar"
            label="Avatar image"
            accept="image/*"
            {...register("avatar", {
              required: false,
            })}
            errors={errors}
            disabled={isUpdating}
          />
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <Button
              secondary
              type="button"
              onClick={() => {
                reset({
                  email: email,
                  fullName: currentFullName,
                  avatar: null,
                });
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              disabled={isUpdating}
              disabledStyles="!bg-indigo-500"
              icon={isUpdating ? <SpinnerMini /> : null}
            >
              <span>{isUpdating ? "Updating..." : "Update account"}</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateUserDataForm;
