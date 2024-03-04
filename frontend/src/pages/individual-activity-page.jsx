import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getData, putData, deleteData } from "../services/api-calls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageLoader from "../components/page-loader";
import DeletePopUp from "../components/pop-ups/delete-pop-up";
import DeleteButton from "../components/buttons/delete-button";
import ActivityForm from "../components/forms/activity-form";
import EditButton from "../components/buttons/edit-button";

const IndividualActivityPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { activity_id } = useParams();
  const queryClient = useQueryClient();

  const getActivityQuery = useQuery({
    queryKey: ["individualActivity", activity_id],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return getData(
        `/activity/indvidual-activity/${activity_id}`,
        accessToken
      );
    },
  });

  const updateActivityMutation = useMutation({
    mutationFn: async (data) => {
      const accessToken = await getAccessTokenSilently();
      data = { ...data, user_id: user_id };
      return putData(
        `/activity/individual-activity/${activity_id}/update`,
        data,
        accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["individualActivity", activity_id]);
      setIsEditing(false);
    },
  });

  const deleteActivityMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return deleteData(
        `/activity/individual-activity/${activity_id}/delete`,
        accessToken
      );
    },
    onSuccess: () => {
      navigate(`/activity/`);
    },
  });

  const deleteActivity = async (deleting) => {
    if (deleting) {
      deleteActivityMutation.mutate();
    } else {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <h1>Activity</h1>
      {getActivityQuery.isLoading && <PageLoader />}
      {getActivityQuery.isError && (
        <ErrorMsg msg={JSON.stringify(getActivityQuery.error.message)} />
      )}
      {isAuthenticated &&
        getActivityQuery.isSuccess &&
        getActivityQuery.data.map((activity) => {
          return (
            <div key={activity.activity_id}>
              <span>{activity.date}</span> | <span>{activity.location}</span> |{" "}
              <span>{activity.surface}</span>
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
        <ActivityForm
          activity={getActivityQuery.data[0]}
          setIsEditing={setIsEditing}
          mutationFunction={updateActivityMutation}
        />
      )}
      {isDeleting && (
        <DeletePopUp
          itemToDelete={getActivityQuery.data[0].type}
          deleteItem={deleteActivity}
        />
      )}
    </>
  );
};

export default IndividualActivityPage;
