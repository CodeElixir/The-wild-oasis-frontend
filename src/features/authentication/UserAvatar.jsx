import { useUser } from "./useUser";
import { BASE_URL } from "../../services/axios.js";

function UserAvatar() {
  const { user } = useUser();
  const { fullName, id } = user;

  const imageSrc = BASE_URL + `users/${id}/avatar`;

  return (
    <div className="flex min-w-max items-center gap-3 text-sm font-semibold">
      <img
        className="block aspect-square w-10 rounded-full object-cover object-center outline-none outline-1 outline-offset-0 outline-gray-100"
        src={imageSrc || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
