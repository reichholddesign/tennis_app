import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "../components/page-layout";
import EditButton from "../components/buttons/edit-button";
import ProfileForm from "../components/forms/profile-form";
import moment from "moment";

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const getProfile = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/player/profile`;

      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: user.sub,
          given_name: user.given_name,
          family_name: user.family_name,
        }),
      });

      let profile = await metadataResponse.json();
      // check for valid date
      const dateObject = new Date(profile.dob);
      if (!isNaN(dateObject.getTime())) {
        profile = { ...profile, dob: moment(dateObject).format("YYYY-MM-DD") };
      }
      setProfile(profile);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateProfile = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (formData.height === "") formData.height = 0;

    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/player/profile-update`;
      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          dob: formData.dob,
          height: formData.height,
          gender: formData.gender,
          specified_gender: formData.specified_gender,
          hand: formData.hand,
          rating: formData.rating,
          user_id: user.sub,
        }),
      });
      const res = await metadataResponse;
      console.log(res);
      getProfile();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getAccessTokenSilently, user?.sub]);

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
          {isEditing && (
            <ProfileForm
              profile={profile}
              formData={formData}
              setFormData={setFormData}
              updateProfile={updateProfile}
            />
          )}
          <h3>User Metadata</h3>
        </div>
      )}
    </PageLayout>
  );
};

export default ProfilePage;

// const getUserMetadata = async () => {
//   const domain = import.meta.env.VITE_AUTH_DOMAIN;

//   try {
//     const accessToken = await getAccessTokenSilently({
//       authorizationParams: {
//         audience: `https://${domain}/api/v2/`,
//         scope: "read:current_user",
//       },
//     });

//     const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

//     const metadataResponse = await fetch(userDetailsByIdUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const { user_metadata } = await metadataResponse.json();

//     setUserMetadata(user_metadata);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// const checkNewApi = async () => {
//   try {
//     const accessToken = await getAccessTokenSilently();
//     const publicApi = `http://localhost:6060/api/messages/protected`;

//     const metadataResponse = await fetch(publicApi, {
//       method: "GET",
//       headers:
//     {
//           "content-type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//     }
//     });
//     const msg = await metadataResponse.json();
//     console.log(msg)

//   } catch (e) {
//     console.log(e.message);
//   }
// }
