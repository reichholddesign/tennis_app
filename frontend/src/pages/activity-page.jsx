import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getData, postData } from "../services/api-calls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddButton from "../components/buttons/add-button";
import AddActivityForm from "../components/forms/add-activity-form";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const ActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const getActivityQuery = useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return getData(`/activity`, accessToken, user);
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return postData(
        `/user/${user?.sub.split("|")[1]}/add-activity`,
        formData,
        accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activity"]);
      setIsAdding(false);
    },
  });

  return (
    <PageLayout>
      <h1>Activity</h1>
      <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
      {isAdding && (
        <AddActivityForm
          formData={formData}
          setFormData={setFormData}
          createActivityMutation={createActivityMutation}
        />
      )}
      {getActivityQuery.isLoading && <PageLoader />}
      {getActivityQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getActivityQuery.error.message)} />
      )}
      {isAuthenticated &&
        getActivityQuery.isSuccess &&
        getActivityQuery.data.map((activity) => (
          <ActivityItem key={activity.activity_id} activity={activity} />
        ))}
    </PageLayout>
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
