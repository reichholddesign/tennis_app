import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeletePopUp from "../components/pop-ups/delete-pop-up";
import DeleteButton from "../components/buttons/delete-button";
import PageLayout from "../components/page-layout";
import UpdatePlayerForm from "../components/forms/edit-player-form";
import EditButton from "../components/buttons/edit-button";

const IndividualPlayerPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [individualPlayer, setindividualPlayer] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { player_id } = useParams();
  const navigate = useNavigate();

  const getIndividualPlayer = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/players/${player_id}`;

      const metadataResponse = await fetch(publicApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          player_id: player_id,
          user_id: user.sub,
        }),
      });

      let data = await metadataResponse.json();
      setindividualPlayer(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updatePlayer = async () => {
    try {
      console.log(formData);
      const accessToken = await getAccessTokenSilently();
      const publicApi = `http://localhost:6060/user/players/${player_id}/update`;
      const metadataResponse = await fetch(publicApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          player_id: player_id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          gender: formData.gender,
          specified_gender: formData.specified_gender,
          hand: formData.hand,
          rating: formData.rating,
          notes: formData.notes,
        }),
      });
      const res = await metadataResponse;
      setIsEditing(false);
      getIndividualPlayer();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const deletePlayer = async (deleting) => {
    if (deleting) {
      try {
        const accessToken = await getAccessTokenSilently();
        const publicApi = `http://localhost:6060/user/players/${player_id}/delete`;
        const response = await fetch(publicApi, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          // Handle successful deletion
          navigate(`/players`);
        } else {
          // Handle non-successful responses
          const errorMessage = await response.json(); // Extract error message from response body
          console.error("Failed to delete player:", errorMessage);
        }
      } catch (e) {
        console.error("Error deleting player:", e);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  useEffect(() => {
    getIndividualPlayer();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <PageLayout>
        <h1>Player Page</h1>
        {isAuthenticated &&
          !isEditing &&
          individualPlayer.map((player) => {
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

                {player.activity &&
                  player.activity.map((activity, index) => (
                    <div key={index}>
                      <span>{activity.date}</span>
                      <span>{activity.location}</span>
                      <span>{activity.type}</span>
                      <span>{activity.format}</span>
                      <span>{activity.score}</span>
                    </div>
                  ))}

                <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
                <DeleteButton setIsDeleting={setIsDeleting} />
              </div>
            );
          })}
        {isAuthenticated && isEditing && (
          <UpdatePlayerForm
            player={individualPlayer[0]}
            formData={formData}
            setFormData={setFormData}
            updatePlayer={updatePlayer}
            setIsEditing={setIsEditing}
          />
        )}
        {isDeleting && (
          <DeletePopUp
            itemToDelete={individualPlayer[0].type}
            deleteItem={deletePlayer}
          />
        )}
      </PageLayout>
    </>
  );
};

export default IndividualPlayerPage;
