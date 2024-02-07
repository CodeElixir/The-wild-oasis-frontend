import { useDarkMode } from "../../context/DarkModeContext";

function Logo({ className }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex justify-center">
      <img
        src={isDarkMode ? "./logo-dark.png" : "./logo-light.png"}
        alt="Logo"
        className={`h-24 w-auto ${className}`}
      />
    </div>
  );
}

export default Logo;
