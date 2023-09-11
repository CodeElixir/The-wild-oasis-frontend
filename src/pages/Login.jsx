import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo/Logo";

function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-12 text-gray-700 dark:bg-gray-900 dark:text-gray-200 lg:px-8">
      <div className="mx-auto w-full sm:max-w-sm">
        <div>
          <Logo className="h-20" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Log in to your account
          </h2>
        </div>
        <div className="mt-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
