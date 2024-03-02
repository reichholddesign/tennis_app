import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import PageLayout from "../components/page-layout";
import EditButton from "../components/buttons/edit-button";
import ProfileForm from "../components/forms/profile-form";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;

  return (
    <>
      {getProfileQuery.isLoading && <PageLoader />}
      {getProfileQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getProfileQuery.error)} />
      )}

      {isAuthenticated &&
        getProfileQuery.isSuccess &&
        !getProfileQuery.data.user && (
          <>
            <p>Please complete out your profile</p>
            <ProfileForm
              profile={user}
              route="create"
              createProfileMutation={createProfileMutation}
            />
          </>
        )}

      {getProfileQuery.isSuccess &&
        getProfileQuery.data.user &&
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
              // onClick={handleProfilePicUpdate}
              src={user.picture}
            />
            <h2>
              {user.name} {user.family_name}
            </h2>
            {isEditing && (
              <ProfileForm
                profile={user}
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
