import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeletePopUp from "../components/pop-ups/delete-pop-up";
import DeleteButton from "../components/buttons/delete-button";
import PageLoader from "../components/page-loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, putData, deleteData } from "../services/api-calls";
import ErrorMsg from "../components/erorr-message";
import PageLayout from "../components/page-layout";
import PlayerForm from "../components/forms/player-form";
import EditButton from "../components/buttons/edit-button";
import { Link } from "react-router-dom";

const IndividualPlayerPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { player_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getPlayersQuery = useQuery({
    queryKey: ["individualPlayer", player_id],
    queryFn: async () => {
      console.log("fired");
      const accessToken = await getAccessTokenSilently();
      const data = await getData(
        `/players/individual-player/${player_id}`,
        accessToken
      );
      console.log(data);
      return data;
    },
  });

  const updatePlayerMutation = useMutation({
    mutationFn: async (data) => {
      const accessToken = await getAccessTokenSilently();
      return await putData(
        `/players/individual-player/${player_id}/update`,
        data,
        accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["individualPlayer", player_id]);
      setIsEditing(false);
    },
  });

  const deletePlayerMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return await deleteData(
        `/players/individual-player/${player_id}/delete`,
        accessToken
      );
    },
    onSuccess: () => {
      navigate(`/players`);
    },
  });

  const deletePlayer = async (deleting) => {
    if (deleting) {
      deletePlayerMutation.mutate();
    } else {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <PageLayout>
        <h1>Player Page</h1>

        {getPlayersQuery.isLoading && <PageLoader />}
        {getPlayersQuery.isError && (
          <ErrorMsg msg={JSON.stringify(getPlayersQuery.error.message)} />
        )}

        {isAuthenticated &&
          getPlayersQuery.isSuccess &&
          getPlayersQuery.data.map((player) => {
            return (
              <div key={player.player_id}>
                <h2>
                  {player.first_name}{" "}
                  {player.last_name && " " && player.last_name}
                </h2>
                <span>{player.rating && player.rating}</span>
                <span>{player.gender && player.gender}</span>
                <span>{player.age && player.age}</span>
                <span>{player.hand && player.hand}</span>
                <span>{player.notes && player.notes}</span>
                <span>
                  Wins:{" "}
                  {player.activity &&
                    player.activity.reduce((prev, cur) => {
                      if (cur.outcome === "W") {
                        return prev + 1; // Increment accumulator when outcome is "W"
                      } else {
                        return prev; // If outcome is not "W", return the accumulator without changing it
                      }
                    }, 0)}
                </span>
                <h3>Activity</h3>

                {player.activity && (
                  <div>
                    {player.activity.map((activity, index) => (
                      <Link
                        key={index}
                        to={`/activity/${activity.activity_id}`}
                      >
                        <div>
                          <span>{activity.date}</span>
                          <span>{activity.location}</span>
                          <span>{activity.type}</span>
                          <span>{activity.format}</span>
                          <span>{activity.score}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
                <DeleteButton setIsDeleting={setIsDeleting} />
              </div>
            );
          })}
        {isAuthenticated && isEditing && (
          <PlayerForm
            player={getPlayersQuery.data[0]}
            mutationFunction={updatePlayerMutation}
            setIsEditing={setIsEditing}
          />
        )}
        {isDeleting && (
          <DeletePopUp
            itemToDelete={getPlayersQuery.data[0].type}
            deleteItem={deletePlayer}
          />
        )}
      </PageLayout>
    </>
  );
};

export default IndividualPlayerPage;
