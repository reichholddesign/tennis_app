import { useUserProfile } from "../contexts/profile-context";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";
import { Link } from "react-router-dom";
import { Avatar, AvatarBadge } from "@chakra-ui/react";

const Profile = () => {
  const { getProfileQuery } = useUserProfile();

  return (
    <>
      {getProfileQuery.isLoading && <PageLoader />}
      {getProfileQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getProfileQuery.error)} />
      )}
      {getProfileQuery.isSuccess &&
        getProfileQuery.data.userData.map((profile, i) => (
          <div key={`profile.sub-${i}`}>
            <Link to="profile">
              {" "}
              <Avatar size="lg" name={profile.name} src={profile.picture} m="4">
                {" "}
                <AvatarBadge
                  borderColor="papayawhip"
                  bg="purple"
                  boxSize="1.25em"
                  p="3.5"
                  fontSize="xs"
                >
                  {profile.rating}
                </AvatarBadge>
              </Avatar>
            </Link>
          </div>
        ))}
    </>
  );
};

export default Profile;
