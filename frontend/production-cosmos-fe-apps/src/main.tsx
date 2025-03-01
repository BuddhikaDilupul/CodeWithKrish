import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/primereact.min.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </PrimeReactProvider>
);
