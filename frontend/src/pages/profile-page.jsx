import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "../components/page-layout";
import EditButton from "../components/buttons/edit-button";
import ProfileForm from "../components/forms/edit-profile-form";
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
      return await getData(`/user/${encodeURI(user_id)}/profile`, accessToken);
    },
  });

  const createProfileMutation = useMutation({
    mutationFn: async (data) => {
      const accessToken = await getAccessTokenSilently();
      console.log(formData);
      return putData(
        `/user/${encodeURI(user_id)}/profile/update`,
        data,
        accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
    },
  });

  return (
    <PageLayout>
      {getProfileQuery.isLoading && <PageLoader />}
      {getProfileQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getProfileQuery.error)} />
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
