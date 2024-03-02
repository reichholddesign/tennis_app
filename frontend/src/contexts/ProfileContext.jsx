import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, putData, postData } from "../services/api-calls";

// Create a context to hold user profile data
const UserProfileContext = createContext();

// Custom hook to use the UserProfileContext
export const useUserProfile = () => useContext(UserProfileContext);

// UserProfileProvider component to fetch and provide user profile data
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  useEffect(() => {
    const getProfile = async () => {
      const accessToken = await getAccessTokenSilently();
      const data = await getData(
        `/user/${encodeURI(user?.sub)}/profile`,
        accessToken
      );
      console.log("here we go again");
      setUserProfile(data);

      // const getProfileQuery = useQuery({
      //   queryKey: ["profile"],
      //   queryFn: async () => {
      //     const accessToken = await getAccessTokenSilently();
      //     const data = await getData(
      //       `/user/${encodeURI(user_id)}/profile`,
      //       accessToken
      //     );
      //   },
      // });
    };
    getProfile();
    // getProfileQuery();
  }, [getAccessTokenSilently, !userProfile]);

  return (
    <UserProfileContext.Provider value={userProfile}>
      {children}
    </UserProfileContext.Provider>
  );
};
