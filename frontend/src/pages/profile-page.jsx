import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserProfile } from "../contexts/profile-context";
import EditButton from "../components/buttons/edit-button";
import ProfileForm from "../components/forms/profile-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putData } from "../services/api-calls";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { getProfileQuery } = useUserProfile();

  const createProfileMutation = useMutation({
    mutationFn: async (data) => {
      const accessToken = await getAccessTokenSilently();
      delete data.route;
      return putData(
        `/user/${encodeURI(user_id)}/profile/update`,
        data,
        accessToken
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
    },
  });

  return (
    <>
      {getProfileQuery.isLoading && <PageLoader />}
      {getProfileQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getProfileQuery.error)} />
      )}

      {isAuthenticated &&
        getProfileQuery.isSuccess &&
        getProfileQuery.data.first_login &&
        !getProfileQuery.data.userData[0].profile_complete && (
          <>
            <p>Please complete out your profile</p>
            <ProfileForm
              profile={getProfileQuery.data.userData[0]}
              route="create"
              createProfileMutation={createProfileMutation}
            />
          </>
        )}

      {isAuthenticated &&
        getProfileQuery.isSuccess &&
        getProfileQuery.data.userData[0].profile_complete &&
        getProfileQuery.data.userData.map((user) => (
          <div key={user_id}>
            <img
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt={user.profile_img_alt}
              src={user.picture}
            />
            <h2>
              {user.name} {user.family_name}
            </h2>
            <p>Rating: {user.rating}</p>
            <p>Hand: {user.hand}</p>
            <p>Gender: {user.gender}</p>
            {isEditing && (
              <ProfileForm
                profile={getProfileQuery.data.userData[0]}
                route="update"
                createProfileMutation={createProfileMutation}
              />
            )}
            <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
        ))}
    </>
  );
};

export default ProfilePage;
