import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import AddButton from "../components/buttons/add-button";
import AddActivityForm from "../components/forms/add-activity-form";

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
  const [isAdding, setIsAdding] = useState(false);
  const [record, setRecord] = useState(false);
  const [fullActivity, setFullActivity] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const [formData, setFormData] = useState({});

  const getActivityData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/activity`;

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
      console.log(data);
      // check for valid date
      // const dateObject = new Date(profile.dob);
      // if (!isNaN(dateObject.getTime())) {
      //   profile = { ...profile, dob: moment(dateObject).format("YYYY-MM-DD") };
      // }

      // setRecord(calculateRecord(data));
      setFullActivity(data.activityData);
      setPlayersData(data.playersData);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addActivity = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    console.log(formData.location);

    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/add-activity`;
      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
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
      getActivity();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setIsAdding(false);
  };

  useEffect(() => {
    getActivityData();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Activity</h1>
        <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
        {isAdding && (
          <AddActivityForm
            formData={formData}
            setFormData={setFormData}
            addActivity={addActivity}
            playersData={playersData}
          />
        )}
        <span>W-L: {record && record}</span>

        {isAuthenticated &&
          fullActivity.map((activity) => {
            return (
              <div key={activity.activity_id}>
                <span>{activity.date}</span>
                <h2>
                  <Link to={`/activity/${activity.activity_id}`}>
                    {" "}
                    {activity.type} VS.{" "}
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
