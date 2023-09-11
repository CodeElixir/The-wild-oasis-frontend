import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Update hotel settings</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <UpdateSettingsForm />
      </div>
    </div>
  );
}

export default Settings;
