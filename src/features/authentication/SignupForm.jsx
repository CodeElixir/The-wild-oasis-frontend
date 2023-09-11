import { useForm } from "react-hook-form";
import useSignup from "./useSignup";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = ({ fullName, email, password }) => {
    signup(
      { fullName: fullName.trim(), email: email.trim(), password },
      { onSettled: () => reset() },
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <form
        className="grid grid-cols-1 gap-y-6 overflow-hidden rounded-xl bg-white p-6 text-sm dark:bg-gray-900 dark:bg-opacity-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="fullName"
          name="fullName"
          label="Full name"
          type="text"
          {...register("fullName", {
            required: "This field is required.",
          })}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="email"
          name="email"
          label="Email address"
          type="email"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="password"
          name="password"
          label="Password (min 8 characters)"
          type="password"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          label="Repeat password"
          type="password"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          errors={errors}
          disabled={isLoading}
        />
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <Button
            secondary
            type="button"
            onClick={() => {
              reset();
            }}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
