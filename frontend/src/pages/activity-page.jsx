import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getData, postData } from "../services/api-calls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddButton from "../components/buttons/add-button";
import ActivityForm from "../components/forms/activity-form";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const ActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isAdding, setIsAdding] = useState(false);
  const queryClient = useQueryClient();

  const getActivityQuery = useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return getData(`/activity/${encodeURI(user_id)}`, accessToken);
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async (data) => {
      let setsVal = Number(data.sets);
      let scoreVal = "";
      for (let i = 0; i < setsVal; i++) {
        scoreVal += `${data[`set-${i + 1}-user-score`]}-${
          data[`set-${i + 1}-player-score`]
        }${i + 1 === setsVal ? "" : ";"}`;
      }

      const accessToken = await getAccessTokenSilently();
      return postData(
        `/activity/${encodeURI(user_id)}/add-activity`,
        { ...data, score: scoreVal },
        accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activity"]);
      setIsAdding(false);
    },
  });

  return (
    <>
      <h1>Activity</h1>
      {isAdding && (
        <ActivityForm actviity={{}} mutationFunction={createActivityMutation} />
      )}
      <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />

      {getActivityQuery.isLoading && <PageLoader />}
      {getActivityQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getActivityQuery.error.message)} />
      )}
      {getActivityQuery.isSuccess && getActivityQuery.data < 1 && (
        <>No activity</>
      )}
      {getActivityQuery.isSuccess &&
        getActivityQuery.data.map((activity) => (
          <ActivityItem key={activity.activity_id} activity={activity} />
        ))}
    </>
  );
};

const ActivityItem = ({ activity }) => (
  <div>
    <span>{activity.date}</span>
    <h2>
      <Link to={`/activity/${activity.activity_id}`}>
        {activity.type} VS. {activity.first_name}
      </Link>
      <a href="#">{activity.opponent}</a>
    </h2>
    <span>{activity.outcome}</span>
    <span>{activity.score}</span>
  </div>
);

export default ActivityPage;
