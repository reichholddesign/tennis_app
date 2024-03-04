import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../services/api-calls";
import { useAuth0 } from "@auth0/auth0-react";

// Create a new context for the user profile
const UserProfileContext = createContext();

// Create a provider component to wrap your app and provide the user profile
export function UserProfileProvider({ children }) {
  const { user, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const getProfileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const data = await getData(
        `/user/${encodeURI(user_id)}/profile`,
        accessToken
      );

      return data;
    },
  });

  return (
    <UserProfileContext.Provider value={{ getProfileQuery }}>
      {children}
    </UserProfileContext.Provider>
  );
}

// Custom hook to access the user profile context
export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
