import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user;

  return (
    <div className="flex min-w-max items-center gap-3 text-sm font-semibold">
      <img
        className="block aspect-square w-10 rounded-full object-cover object-center outline-none outline-1 outline-offset-0 outline-gray-100"
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
