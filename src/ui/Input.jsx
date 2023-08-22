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
    ...rest
  } = props;

  const errorMessage = errors && errors[name]?.message;
  const hasError = !!(errors && errorMessage);

  const errorClasses = () => {
    if (hasError) return "focus:ring-red-500 ring-red-300 text-red-900";
    else return "";
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          disabled={disabled}
          className={`block w-full rounded-md px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300 ${errorClasses()}`}
          {...rest}
        />
        {hasError && (
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex items-center pr-3">
            <HiMiniExclamationCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {hasError && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

export default Input;
