import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@fontsource/raleway/800.css";
import "@fontsource/open-sans/700.css";
import theme from "./theme/index";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./app";

import Auth0ProviderWithNavigate from "./auth0-provider-with-navigate";

const queryClient = new QueryClient();

// const theme = extendTheme(globalStyles);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
          <ReactQueryDevtools />
        </ChakraProvider>
      </QueryClientProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
  // </React.StrictMode>
);
