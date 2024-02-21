import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "../services/api-calls";
import AddButton from "../components/buttons/add-button";
import PlayerForm from "../components/forms/player-form";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const PlayersPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user_id = user?.sub;
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const getPlayersQuery = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const data = await getData(`/players/${user_id}`, accessToken);
      return data;
    },
  });

  const createPlayersMutation = useMutation({
    mutationFn: async (data) => {
      const accessToken = await getAccessTokenSilently();
      return postData(`/players/${user_id}/add-player`, data, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
      setIsAdding(false);
    },
  });

  return (
    <>
      <PageLayout>
        <h1>Players</h1>
        <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
        {isAdding && (
          <PlayerForm profile={{}} mutationFunction={createPlayersMutation} />
        )}

        {getPlayersQuery.isLoading && <PageLoader />}
        {getPlayersQuery.isError && (
          <ErrorMsg msg={JSON.stringify(getPlayersQuery.error.message)} />
        )}

        {isAuthenticated &&
          getPlayersQuery.isSuccess &&
          getPlayersQuery.data.map((player) => {
            return <PlayerItem key={player.player_id} player={player} />;
          })}
      </PageLayout>
    </>
  );
};

const PlayerItem = ({ player }) => (
  <div>
    <Link to={`/players/${player.player_id}`}>
      <h2>{player.first_name}</h2>
    </Link>
    <span>{player.gender}</span>
    <span>{player.hand}</span>
    <span>{player.rating}</span>
    <p>{player.notes}</p>
  </div>
);

export default PlayersPage;
