import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "../components/page-layout";
import EditButton from "../components/buttons/edit-button";
import ProfileForm from "../components/forms/edit-profile-form";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, putData } from "../services/api-calls";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const getProfileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return await getData(`/profile`, accessToken, user_id);
    },
  });

  const createProfileMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return putData(`/profile/update`, formData, accessToken, user_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
    },
  });

  // const updateProfile = async () => {
  //   const formDataToSend = new FormData();
  //   for (const key in formData) {
  //     formDataToSend.append(key, formData[key]);
  //   }
  //   if (formData.height === "") formData.height = 0;

  //   try {
  //     const accessToken = await getAccessTokenSilently();
  //     const publicApi = `http://localhost:6060/user/profile-update`;
  //     const metadataResponse = await fetch(publicApi, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         first_name: formData.first_name,
  //         last_name: formData.last_name,
  //         dob: formData.dob,
  //         height: formData.height,
  //         gender: formData.gender,
  //         specified_gender: formData.specified_gender,
  //         hand: formData.hand,
  //         rating: formData.rating,
  //         user_id: user.sub,
  //       }),
  //     });
  //     const res = await metadataResponse;
  //     console.log(res);
  //     getProfile();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      {getProfileQuery.isLoading && <PageLoader />}
      {getProfileQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getPlayersQuery.error.message)} />
      )}

      {isAuthenticated &&
        getProfileQuery.isSuccess &&
        getProfileQuery.data.map((user) => (
          <div key={user.user_id}>
            <h2>
              {user.first_name} {user.last_name}
            </h2>
            <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
            {isEditing && (
              <ProfileForm
                profile={user}
                formData={formData}
                setFormData={setFormData}
                createProfileMutation={createProfileMutation}
              />
            )}
            <h3>User Metadata</h3>
          </div>
        ))}
    </PageLayout>
  );
};

export default ProfilePage;
