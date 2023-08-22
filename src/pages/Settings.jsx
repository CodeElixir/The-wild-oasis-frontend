import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-2xl font-bold text-gray-700">
        Update hotel settings
      </h1>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
