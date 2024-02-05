import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AxiosProvider } from "./context/AxiosContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "1rem",
                  maxWidth: "31.25rem",
                  padding: "1rem 1.5rem",
                  backgroundColor: "#fff",
                  color: "theme(colors.gray.700)",
                },
              }}
            />
            <AppRoutes />
          </QueryClientProvider>
        </DarkModeProvider>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
