import { StrictMode, useEffect } from "react";
//import './App.css'
import { router } from "./router/router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";

function App() {
  useEffect(() => {
    document.title = "My Neuron";
  }, []);
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <StrictMode>
        <RouterProvider router={router}></RouterProvider>
        {import.meta.env.VITE_SHOW_DEV_TOOLS && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        )}
      </StrictMode>
    </QueryClientProvider>
  );
}

export default App;
