import { forwardRef } from "react";

const Checkbox = forwardRef(function Checkbox(props, _ref) {
  const {
    checked,
    onChange = () => {},
    disabled = false,
    id,
    children,
    inputStyles = "",
    labelStyles = "",
  } = props;

  return (
    <div ref={_ref} className="flex items-center">
      <input
        className={`h-5 w-5 rounded border border-gray-300 text-indigo-600 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 dark:!bg-white dark:!bg-opacity-5 dark:disabled:bg-opacity-5 dark:disabled:hover:!bg-opacity-5 ${inputStyles}`}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={!disabled ? id : ""}
        className={`ml-3 text-sm font-medium leading-6 ${labelStyles}`}
      >
        {children}
      </label>
    </div>
  );
});

export default Checkbox;
