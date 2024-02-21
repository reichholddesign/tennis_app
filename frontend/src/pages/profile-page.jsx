import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "../components/page-layout";
import EditButton from "../components/buttons/edit-button";
import ProfileForm from "../components/forms/profile-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, putData, postData } from "../services/api-calls";
import GetUnsplashPhoto from "../services/unsplash";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();
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

  const createProfileMutation = useMutation({
    mutationFn: async (data) => {
      const accessToken = await getAccessTokenSilently();
      if (data.route === "update") {
        return putData(
          `/user/${encodeURI(user_id)}/profile/update`,
          data,
          accessToken
        );
      } else if (data.route === "create") {
        return postData(
          `/user/${encodeURI(user_id)}/profile/create`,
          data,
          accessToken
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
    },
  });

  // const handleProfilePicUpdate = async () => {
  //   const newImgUrl = await GetUnsplashPhoto("tennis");
  //   createProfileMutation.mutate({
  //     profile_img_url: newImgUrl.urls.thumb,
  //   });
  // };

  return (
    <PageLayout>
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
              src={user.profile_img_url}
            />
            <h2>
              {user.first_name} {user.last_name}
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
    </PageLayout>
  );
};

export default ProfilePage;
