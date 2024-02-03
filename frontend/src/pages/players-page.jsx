import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import AddButton from "../components/buttons/add-button";
import AddPlayerForm from "../components/forms/add-player-form";

const PlayersPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdding, setIsAdding] = useState(false);
  const [playersData, setPlayersData] = useState([]);
  const [formData, setFormData] = useState({});

  const getPlayers = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/players`;

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

      setPlayersData(data);
    } catch (e) {
      console.log(e.message);
    }
  };

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
      console.log(data);

      getPlayers();
    } catch (e) {
      console.error("Failed to add player:", e);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    getPlayers();
  }, [getAccessTokenSilently, user?.sub]);

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

        {isAuthenticated &&
          playersData.map((player) => {
            return (
              <div key={player.player_id}>
                <Link to={`/players/${player.player_id}`}>
                  <h2>{player.first_name}</h2>
                </Link>
                <span>{player.gender}</span>
                <span>{player.hand}</span>
                <span>{player.rating}</span>
                <p>{player.notes}</p>
              </div>
            );
          })}
      </PageLayout>
    </>
  );
};

export default PlayersPage;
