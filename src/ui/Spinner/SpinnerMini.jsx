import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className }) {
  return <BiLoaderAlt className={`h-6 w-6 animate-spin ${className}`} />;
}

export default SpinnerMini;
