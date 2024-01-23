import PageLayout from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import moment from "moment";
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
      const publicApi = `http://localhost:6060/user/add-player`;
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
      getPlayers();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setIsAdding(false);
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
            // addPlayer={addPlayer}
          />
        )}

        {isAuthenticated &&
          playersData.map((player) => {
            return (
              <div key={player.player_id}>
                <h2>{player.first_name}</h2>
                <span>{player.gender}</span>
                <h2>
                  {/* <Link to={`/user/${player.match_id}`}>
                    {" "}
                    {player.type} Match VS.{" "}
                  </Link> */}
                  <a href="#">{player.hand}</a>
                </h2>
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
