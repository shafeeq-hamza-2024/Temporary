import { StrictMode, useEffect, useState } from "react";
//import './App.css'
import { router } from "./router/router.jsx";

import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    document.title = "My Neuron";
  }, []);
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <StrictMode>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
        ></ReactQueryDevtools>
      </StrictMode>
    </QueryClientProvider>
  );
}

export default App;
