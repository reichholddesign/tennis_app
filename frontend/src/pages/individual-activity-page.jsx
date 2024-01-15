import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import PageLayout from "../components/page-layout";

import EditButton from "../components/buttons/edit-button";

const IndividualActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [fullActivity, setFullActivity] = useState([]);

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

  useEffect(() => {
    getIndividualActivity();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Match</h1>
        <p>Match ID: {match_id}</p>

        {isAuthenticated &&
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
                <EditButton />
              </div>
            );
          })}
      </PageLayout>
    </>
  );
};

export default IndividualActivityPage;
