import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './styles/index.css'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
import App from './app'

import  Auth0ProviderWithNavigate  from "./auth0-provider-with-navigate";




ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
    <Auth0ProviderWithNavigate>
            <App />
  </Auth0ProviderWithNavigate>
  </BrowserRouter>
// </React.StrictMode> 
)
