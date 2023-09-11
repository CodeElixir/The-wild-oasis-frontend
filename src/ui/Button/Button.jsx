import PropTypes from "prop-types";

function Button(props) {
  const {
    children,
    size = "md",
    primary = true,
    secondary = false,
    danger = false,
    variant = "normal",
    disabled = false,
    onClick = () => {},
    className = "",
    disabledStyles = "",
    icon = null,
    ...other
  } = props;

  const getBorderRadius = () => {
    if (variant === "rounded") {
      return "rounded-full";
    }
    switch (size) {
      case "xs":
      case "sm":
        return "rounded";

      case "md":
      case "lg":
      case "xl":
        return "rounded-md";
    }
  };

  const getPadding = () => {
    switch (size) {
      case "xs":
      case "sm":
        return "py-1 px-2";

      case "md":
        return "py-1.5 px-2.5";

      case "lg":
        return "py-2 px-3";

      case "xl":
        return "py-2.5 px-3.5";
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
      case "md":
      case "lg":
      case "xl":
        return "text-sm";
    }
  };

  const getTypeStyles = () => {
    if (secondary)
      return "text-gray-900 bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300 dark:bg-opacity-5 dark:hover:bg-opacity-20 dark:text-gray-200 dark:ring-gray-200 dark:ring-gray-800";
    else if (danger)
      return "text-white bg-red-600 hover:bg-red-500 focus-visible:outline-none focus-visible:outline-red-600";
    else if (primary)
      return "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-none focus-visible:outline-indigo-600";
    else return "";
  };

  const getDisabledStyles = () => {
    if (!disabled) return "";
    if (disabledStyles.length > 0)
      return `${disabledStyles} !cursor-not-allowed`;
    return "!bg-gray-300 !text-gray-900 !cursor-not-allowed";
  };

  return (
    <button
      className={`cursor-pointer bg-none font-semibold shadow-sm ${getPadding()} ${getFontSize()} ${getBorderRadius()} ${getTypeStyles()} ${getDisabledStyles()} ${className}`}
      onClick={(e) => {
        if (disabled) return;
        onClick(e);
      }}
      {...other}
    >
      {icon ? (
        <div className="flex items-center justify-center gap-3">
          {icon}
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
}

Button.prototypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    PropTypes.string,
  ]),

  /**
   * The primary button to use.
   * @default 'true'
   */
  primary: PropTypes.bool,

  /**
   * The secondary button to use.
   * @default 'false'
   */
  secondary: PropTypes.bool,

  /**
   * The variant to use.
   * @default 'normal'
   */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(["rounded", "normal"]),
    PropTypes.string,
  ]),
};

export default Button;
