import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Update user account</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Update user data</h2>
        <UpdateUserDataForm />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Update password</h2>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

export default Account;
