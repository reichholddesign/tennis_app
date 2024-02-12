import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "../services/api-calls";

import AddButton from "../components/buttons/add-button";
import AddPlayerForm from "../components/forms/add-player-form";
import PageLoader from "../components/page-loader";
import ErrorMsg from "../components/erorr-message";

const PlayersPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdding, setIsAdding] = useState(false);
  const [playersData, setPlayersData] = useState([]);
  const [formData, setFormData] = useState({});

  const getPlayersQuery = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return getData(`/user/${user?.sub.split("|")[1]}/players`, accessToken);
    },
  });

  const createPlayerMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const postData = { ...formData, user_id: user.sub };
      return postData("/user/add-activity", postData, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activity"]);
      setIsAdding(false);
    },
  });

  const addPlayer = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = "http://localhost:6060/user/add-player";

      // Destructuring formData
      const {
        first_name,
        last_name,
        gender,
        specified_gender,
        age,
        hand,
        rating,
        notes,
      } = formData;

      const response = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user_id: user.sub,
          first_name,
          last_name,
          gender,
          specified_gender,
          age,
          hand,
          rating,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming you want to do something with the JSON response
      const data = await response.json();

      getPlayers();
    } catch (e) {
      console.error("Failed to add player:", e);
    } finally {
      setIsAdding(false);
    }
  };

  // useEffect(() => {
  //   getPlayers();
  // }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Players</h1>
        <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
        {isAdding && (
          <AddPlayerForm
            formData={formData}
            setFormData={setFormData}
            addPlayer={addPlayer}
          />
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
