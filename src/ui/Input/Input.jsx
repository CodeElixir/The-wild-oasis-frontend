import { forwardRef } from "react";
import { HiMiniExclamationCircle } from "react-icons/hi2";

const Input = forwardRef(function Input(props, ref) {
  const {
    label,
    id,
    name,
    type = "text",
    disabled = false,
    errors = undefined,
    labelStyles = "",
    inputContainerStyles = "",
    ...rest
  } = props;

  const errorMessage = errors && errors[name]?.message;
  const hasError = !!(errors && errorMessage);

  const errorClasses = () => {
    if (hasError)
      return "focus:ring-red-500 ring-red-300 text-red-900 dark:text-red-700 dark:ring-red-300 dark:focus:ring-red-500 dark:!ring-opacity-75";
    else return "";
  };

  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium leading-5 ${labelStyles}`}
      >
        {label}
      </label>
      <div className={`relative mt-1 ${inputContainerStyles}`}>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          disabled={disabled}
          className={`block w-full rounded-md px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300 dark:bg-white dark:bg-opacity-5 dark:ring-white dark:ring-opacity-10 dark:focus:ring-indigo-500 ${errorClasses()} ${
            hasError ? "pr-10" : ""
          }`}
          {...rest}
        />
        {hasError && (
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex items-center pr-3">
            <HiMiniExclamationCircle className="h-5 w-5 text-red-500 dark:text-red-700" />
          </div>
        )}
      </div>
      {hasError && errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-700">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

export default Input;
