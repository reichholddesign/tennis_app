import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

// does not seem best way to do this
const calculateRecord = (record) => {
  let wins = 0;
  let loses = 0;
  record.forEach((match) => {
    if (match.outcome.toUpperCase() === "W") wins++;
    else if (match.outcome.toUpperCase() === "L") loses++;
  });
  return `${wins}/${loses}`;
};

const ActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [record, setRecord] = useState(false);
  const [fullActivity, setFullActivity] = useState([]);

  const getActivity = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/player/activity`;

      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: user.sub,
        }),
      });

      let data = await metadataResponse.json();
      // check for valid date
      // const dateObject = new Date(profile.dob);
      // if (!isNaN(dateObject.getTime())) {
      //   profile = { ...profile, dob: moment(dateObject).format("YYYY-MM-DD") };
      // }

      setRecord(calculateRecord(data));
      setFullActivity(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getActivity();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Activity</h1>
        <span>W-L: {record && record}</span>

        {isAuthenticated &&
          fullActivity.map((activity) => {
            return (
              <div key={activity.match_id}>
                <span>{activity.date}</span>
                <h2>
                  <Link to={`/activity/${activity.match_id}`}>
                    {" "}
                    {activity.type} Match VS.{" "}
                  </Link>
                  <a href="#">{activity.opponent}</a>
                </h2>
                <span>{activity.outcome}</span>
                <span>{activity.score}</span>
              </div>
            );
          })}
      </PageLayout>
    </>
  );
};

export default ActivityPage;
