const db = require("../config/db");

module.exports = {
  getPlayers: async (req, res) => {
    try {
      const user = req.body;
      const userId = user.userId.split("|")[1];
      const checkQuery = "SELECT * FROM players WHERE user_id = ?";
      const playeryData = db.query(checkQuery, [userId], (err, data) => {
        if (err) {
          // 500 Internal Server Error - indicates a server-side error
          res.status(500).send(errw);
        } else {
          // Data retrieved successfully - return with 200 OK
          res.json(data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  addPlayer: async (req, res) => {
    try {
      const player = req.body;
      const userId = player.user_id.split("|")[1];
      const date = new Date().toISOString().slice(0, 19).replace("T", " ");

      const values = [
        userId,
        player.first_name,
        player.last_name,
        player.gender,
        player.hand,
        player.rating,
        player.notes,
        date,
        date,
      ];
      const insertQuery =
        "INSERT INTO players (user_id, first_name, last_name,gender,hand,rating,notes,created,updated) VALUES (?, ?, ?,?, ?, ?,?,?,?)";
      const indvidualplayerData = db.query(insertQuery, values, (err, data) => {
        if (err) {
          console.log(err.message);
          // 500 Internal Server Error - indicates a server-side error
          res.status(500).send(err);
        } else {
          // Data retrieved successfully - return with 200 OK
          console.log(data);
          res.json(data);
        }
      });

      console.log(indvidualplayerData);
    } catch (err) {
      console.log(err);
    }
  },
  getIndividualPlayer: (req, res) => {
    try {
      const player_id = req.body.player_id;
      const checkQuery = "SELECT * FROM players WHERE player_id = ?";
      const playeryData = db.query(checkQuery, [player_id], (err, data) => {
        if (err) {
          // 500 Internal Server Error - indicates a server-side error
          res.status(500).send(err);
        } else {
          // Data retrieved successfully - return with 200 OK
          res.json(data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateIndividualPlayer: async (req, res) => {
    const player = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log(player);
    if (player.gender && player.gender !== "Other") {
      player.specified_gender = null;
    }
    try {
      // Update the specific value in the record
      const updateSql = `
          UPDATE players
          SET
            first_name = IFNULL(?, first_name),
            last_name = IFNULL(?, last_name),
            gender = IFNULL(?, gender),
            specified_gender = ?, -- Pass null directly here
            hand = IFNULL(?, hand),
            rating = IFNULL(?, rating),
            notes = IFNULL(?, notes),
            updated = IFNULL(?, updated)
          WHERE player_id = ?;
          `;
      await db.query(
        updateSql,
        [
          player.first_name,
          player.last_name,
          player.gender,
          player.gender !== "Other" ? null : player.specified_gender,
          player.hand,
          player.rating,
          player.notes,
          date,
          player.player_id,
        ],
        (err, results) => {
          if (err) {
            console.error("Error updating the record: " + err.stack);
            return;
          }
          res.status(200).send("Update successful");
        }
      );
    } catch (error) {
      console.error("Error updating value:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteIndividualPlayer: async (req, res) => {
    const player_id = req.params.player_id;
    console.log(player_id);

    const playerDeleteQuery = "DELETE FROM players WHERE player_id = ?";
    const activityDeleteQuery = "DELETE FROM activity WHERE player_id = ?";

    db.beginTransaction((err) => {
      if (err) {
        console.error("Error beginning transaction:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Delete player from 'players' table
      db.query(
        playerDeleteQuery,
        [player_id],
        (playerDeleteErr, playerResult) => {
          if (playerDeleteErr) {
            console.error("Error deleting player:", playerDeleteErr);
            db.rollback(() => {
              res.status(500).json({ error: "Internal server error" });
            });
            return;
          }

          if (playerResult.affectedRows === 0) {
            // No rows affected, meaning no player was found with the given player_id
            db.rollback(() => {
              res.status(404).json({ message: "Player not found" });
            });
          } else {
            // Player deleted successfully, now delete corresponding records in 'activity' table
            db.query(
              activityDeleteQuery,
              [player_id],
              (activityDeleteErr, activityResult) => {
                if (activityDeleteErr) {
                  console.error("Error deleting activity:", activityDeleteErr);
                  db.rollback(() => {
                    res.status(500).json({ error: "Internal server error" });
                  });
                  return;
                }

                db.commit((commitErr) => {
                  if (commitErr) {
                    console.error("Error committing transaction:", commitErr);
                    res.status(500).json({ error: "Internal server error" });
                  } else {
                    res.status(200).json({
                      message: `Player with player_id ${player_id} and associated activities successfully deleted`,
                    });
                  }
                });
              }
            );
          }
        }
      );
    });
  },
};
