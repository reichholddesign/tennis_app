import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import PageLayout from "../components/page-layout";
import EditActivityForm from "../components/forms/edit-activity-form";

import EditButton from "../components/buttons/edit-button";

const IndividualActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [fullActivity, setFullActivity] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { match_id } = useParams();

  const getIndividualActivity = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/player/activity/${match_id}`;

      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          match_id: match_id,
        }),
      });

      let data = await metadataResponse.json();
      // check for valid date
      // const dateObject = new Date(profile.dob);
      // if (!isNaN(dateObject.getTime())) {
      //   profile = { ...profile, dob: moment(dateObject).format("YYYY-MM-DD") };
      // }
      setFullActivity(data);
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const editActivity = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    console.log(formData.location);

    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/player/activity/${match_id}/update`;
      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          match_id: match_id,
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
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIndividualActivity();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Match</h1>
        <p>Match ID: {match_id}</p>

        {isAuthenticated &&
          !isEditing &&
          fullActivity.map((activity) => {
            return (
              <div key={activity.match_id}>
                <span>{activity.date}</span> | <span>{activity.location}</span>{" "}
                | <span>{activity.surface}</span>
                <h2>
                  {" "}
                  {activity.type} Match VS. <a href="#">{activity.opponent}</a>
                </h2>
                <span>{activity.outcome}</span>
                <span>{activity.score}</span>
                <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
              </div>
            );
          })}
        {isAuthenticated && isEditing && (
          <EditActivityForm
            activity={fullActivity[0]}
            formData={formData}
            setFormData={setFormData}
            editActivity={editActivity}
          />
        )}
      </PageLayout>
    </>
  );
};

export default IndividualActivityPage;
