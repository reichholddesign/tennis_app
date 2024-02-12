import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeletePopUp from "../components/pop-ups/delete-pop-up";
import DeleteButton from "../components/buttons/delete-button";

import PageLayout from "../components/page-layout";
import EditActivityForm from "../components/forms/edit-activity-form";

import EditButton from "../components/buttons/edit-button";

const IndividualActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [fullActivity, setFullActivity] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { activity_id } = useParams();

  const getIndividualActivity = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/activity/${activity_id}`;

      const metadataResponse = await fetch(publicApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      let data = await metadataResponse.json();
      // check for valid date
      // const dateObject = new Date(profile.dob);
      // if (!isNaN(dateObject.getTime())) {
      //   profile = { ...profile, dob: moment(dateObject).format("YYYY-MM-DD") };
      // }
      setFullActivity(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const editActivity = async () => {
    try {
      console.log(formData);

      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/activity/${activity_id}/update`;
      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          activity_id: activity_id,
          user_id: user.sub,
          date: formData.date,
          opponent: formData.opponent,
          type: formData.type,
          format: formData.format,
          score: formData.score,
          surface: formData.surface,
          outcome: formData.outcome,
          location: formData.location,
        }),
      });
      const res = await metadataResponse;
      setIsEditing(false);
      getIndividualActivity();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteActivity = async (deleting) => {
    if (deleting) {
      try {
        const accessToken = await getAccessTokenSilently();
        const publicApi = `http://localhost:6060/user/activity/${activity_id}/delete`;
        const response = await fetch(publicApi, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          // Handle successful deletion
          navigate(`/activity/`);
        } else {
          // Handle non-successful responses
          console.error("Failed to delete activity:", response.statusText);
        }
      } catch (e) {
        console.error("Error deleting activity:", e);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  useEffect(() => {
    getIndividualActivity();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Activity</h1>

        {isAuthenticated &&
          !isEditing &&
          fullActivity.map((activity) => {
            return (
              <div key={activity.activity_id}>
                <span>{activity.date}</span> | <span>{activity.location}</span>{" "}
                | <span>{activity.surface}</span>
                <h2>
                  {" "}
                  {activity.type} VS.{" "}
                  <Link to={`/players/${activity.player_id}`}>
                    {activity.first_name}
                  </Link>
                </h2>
                <span>{activity.outcome}</span>
                <span>{activity.score}</span>
                <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
                <DeleteButton setIsDeleting={setIsDeleting} />
              </div>
            );
          })}
        {isAuthenticated && isEditing && (
          <EditActivityForm
            activity={fullActivity[0]}
            formData={formData}
            setFormData={setFormData}
            editActivity={editActivity}
            setIsEditing={setIsEditing}
          />
        )}
        {isDeleting && (
          <DeletePopUp
            itemToDelete={fullActivity[0].type}
            deleteItem={deleteActivity}
          />
        )}
      </PageLayout>
    </>
  );
};

export default IndividualActivityPage;
