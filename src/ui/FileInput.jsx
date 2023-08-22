import { forwardRef } from "react";

const FileInput = forwardRef(function FileInput({ ...props }, ref) {
  const {
    label,
    id,
    name,
    disabled = false,
    errors = undefined,
    ...rest
  } = props;

  const errorMessage = errors && errors[name]?.message;
  const hasError = !!(errors && errorMessage);

  return (
    <div>
      <label className="block text-sm font-medium leading-5 text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          ref={ref}
          type={"file"}
          id={id}
          name={name}
          disabled={disabled}
          className={`block w-full text-gray-700 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-indigo-600 file:px-2.5 file:py-1.5 file:text-sm file:font-semibold file:text-white file:shadow-sm hover:file:bg-indigo-500 focus:outline-none focus-visible:outline-none focus-visible:outline-indigo-600 file:disabled:pointer-events-none file:disabled:bg-gray-300 file:disabled:text-gray-900`}
          {...rest}
        />
      </div>
      {hasError && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

export default FileInput;
