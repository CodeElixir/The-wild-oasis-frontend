import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import SpinnerMini from "../../ui/Spinner/SpinnerMini";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "test@test.com", password: "sandeep123321" },
  });

  const onSubmit = (data) => {
    if (isLoading) return;
    login(data, {
      onSettled: () => reset({ email: "", password: "" }),
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        name="email"
        label="Email address"
        type="email"
        autoComplete="email"
        {...register("email", {
          required: "Email is required.",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Email is not valid.",
          },
        })}
        errors={errors}
        inputContainerStyles="mt-2"
        disabled={isLoading}
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register("password", {
          required: "Password is required.",
        })}
        errors={errors}
        inputContainerStyles="mt-2"
        disabled={isLoading}
      />
      <div className="w-full ">
        <Button
          className="w-full"
          size="lg"
          disabled={isLoading}
          disabledStyles="!bg-indigo-500"
          icon={isLoading ? <SpinnerMini /> : null}
        >
          <span>{isLoading ? "Logging in..." : "Log in"}</span>
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
