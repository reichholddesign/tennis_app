import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

 const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH_CLIENT;
  const redirectUri = import.meta.env.VITE_AUTH_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE
  function onRedirectCallback (appState) {
    navigate(appState?.returnTo || window.location.pathname);
  }

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience:audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate