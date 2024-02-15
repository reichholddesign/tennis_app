const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const executeQuery = async (query, params) => {
  try {
    const [rows] = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error("Query Execution Error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getPlayers: async (req, res) => {
    try {
      const userId = req.params.user_id;
      const checkQuery = "SELECT * FROM players WHERE user_id = ?";
      const activityData = await executeQuery(checkQuery, [userId]);
      res.json(activityData);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  addPlayer: async (req, res) => {
    try {
      const player = req.body;
      const date = new Date().toISOString().slice(0, 19).replace("T", " ");
      const newUuid = uuidv4();
      const values = [
        newUuid,
        req.params.user_id,
        ,
        player.first_name,
        player.last_name || null,
        player.gender || null,
        player.specified_gender || null,
        player.hand || null,
        player.rating || null,
        player.notes || null,
        date,
        date,
      ];
      const insertQuery =
        "INSERT INTO players (player_id, user_id, first_name, last_name, gender, specified_gender, hand, rating, notes, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await db.execute(insertQuery, values);
      res.status(200).send({ msg: "Player added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  getIndividualPlayer: async (req, res) => {
    const player_id = req.params.player_id;
    const userId = req.user_id;

    try {
      const playerQuery = "SELECT * FROM players WHERE player_id = ?";
      const playerData = await db.execute(playerQuery, [player_id]);
      const activityQuery =
        "SELECT * FROM activity WHERE player_id = ? AND user_id = ?";
      const activityData = await db.execute(activityQuery, [player_id, userId]);
      const finalPlayerData = {
        ...playerData[0][0],
        activity: activityData[0],
      };
      res.json([finalPlayerData]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  updateIndividualPlayer: async (req, res) => {
    try {
      const player = req.body;
      const date = new Date().toISOString().slice(0, 19).replace("T", " ");
      console.log(player);
      const updateSql = `
        UPDATE players
        SET
          first_name = IFNULL(?, first_name),
          last_name = IFNULL(?, last_name),
          gender = IFNULL(?, gender),
          specified_gender = ?,
          hand = IFNULL(?, hand),
          rating = IFNULL(?, rating),
          notes = IFNULL(?, notes),
          updated = IFNULL(?, updated)
        WHERE player_id = ?;
      `;

      await executeQuery(updateSql, [
        player.first_name,
        player.last_name,
        player.gender,
        player.gender !== "Other" ? null : player.specified_gender,
        player.hand,
        player.rating,
        player.notes,
        date,
        req.params.player_id,
      ]);

      res.status(200).send("Update successful");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  deleteIndividualPlayer: async (req, res) => {
    try {
      const player_id = req.params.player_id;
      const query = "DELETE FROM players WHERE player_id = ?";
      const result = await executeQuery(query, [player_id]);
      console.log(result);
      if (result.affectedRows === 0) {
        // Player not found
        res.status(404).json({ message: "Player not found" });
      } else {
        // Player deleted successfully
        res.status(200).json({
          message: `Player with id ${player_id} successfully deleted`,
        });
      }
    } catch (err) {
      console.error("Error deleting player:", err);

      // Check if the error message indicates a foreign key constraint violation
      if (err.message.includes("foreign key constraint")) {
        res.status(400).json({
          error: "Cannot delete player due to related data in another table",
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  //   try {
  //     const player_id = req.params.player_id;

  //     const playerDeleteQuery = "DELETE FROM players WHERE player_id = ?";
  //     const activityDeleteQuery = "DELETE FROM activity WHERE player_id = ?";

  //     await db.beginTransaction();

  //     const [playerResult] = await db.execute(playerDeleteQuery, [player_id]);

  //     if (playerResult.affectedRows === 0) {
  //       await db.rollback();
  //       res.status(404).json({ message: "Player not found" });
  //       return;
  //     }

  //     await db.execute(activityDeleteQuery, [player_id]);

  //     await db.commit();

  //     res.status(200).json({
  //       message: `Player with player_id ${player_id} and associated activities successfully deleted`,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     await db.rollback();
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },
};

// const db = require("../config/db");
// const { v4: uuidv4 } = require("uuid");

// module.exports = {
//   getPlayers: async (req, res) => {
//     try {
//       const user = req.body;
//       const userId = user.userId.split("|")[1];
//       const checkQuery = "SELECT * FROM players WHERE user_id = ?";
//       const playeryData = db.query(checkQuery, [userId], (err, data) => {
//         if (err) {
//           // 500 Internal Server Error - indicates a server-side error
//           res.status(500).send(errw);
//         } else {
//           // Data retrieved successfully - return with 200 OK
//           res.json(data);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   addPlayer: async (req, res) => {
//     try {
//       const player = req.body;
//       const userId = player.user_id.split("|")[1];
//       const date = new Date().toISOString().slice(0, 19).replace("T", " ");
//       const newUuid = uuidv4();
//       const values = [
//         newUuid,
//         userId,
//         player.first_name,
//         player.last_name,
//         player.gender,
//         player.hand,
//         player.rating,
//         player.notes,
//         date,
//         date,
//       ];
//       const insertQuery =
//         "INSERT INTO players (player_id, user_id,  first_name, last_name,gender,hand,rating,notes,created,updated) VALUES (?, ?, ?,?,?, ?, ?,?,?,?)";
//       const indvidualplayerData = db.query(insertQuery, values, (err, data) => {
//         if (err) {
//           console.log(err.message);
//           // 500 Internal Server Error - indicates a server-side error
//           res.status(500).send(err);
//         } else {
//           // Data retrieved successfully - return with 200 OK
//           console.log(data);
//           res.json(data);
//         }
//       });

//       console.log(indvidualplayerData);
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getIndividualPlayer: (req, res) => {
//     try {
//       const player_id = req.body.player_id;
//       const checkQuery = "SELECT * FROM players WHERE player_id = ?";
//       const playeryData = db.query(checkQuery, [player_id], (err, data) => {
//         if (err) {
//           // 500 Internal Server Error - indicates a server-side error
//           res.status(500).send(err);
//         } else {
//           // Data retrieved successfully - return with 200 OK
//           res.json(data);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   updateIndividualPlayer: async (req, res) => {
//     const player = req.body;
//     const date = new Date().toISOString().slice(0, 19).replace("T", " ");
//     console.log(player);
//     if (player.gender && player.gender !== "Other") {
//       player.specified_gender = null;
//     }
//     try {
//       // Update the specific value in the record
//       const updateSql = `
//           UPDATE players
//           SET
//             first_name = IFNULL(?, first_name),
//             last_name = IFNULL(?, last_name),
//             gender = IFNULL(?, gender),
//             specified_gender = ?, -- Pass null directly here
//             hand = IFNULL(?, hand),
//             rating = IFNULL(?, rating),
//             notes = IFNULL(?, notes),
//             updated = IFNULL(?, updated)
//           WHERE player_id = ?;
//           `;
//       await db.query(
//         updateSql,
//         [
//           player.first_name,
//           player.last_name,
//           player.gender,
//           player.gender !== "Other" ? null : player.specified_gender,
//           player.hand,
//           player.rating,
//           player.notes,
//           date,
//           player.player_id,
//         ],
//         (err, results) => {
//           if (err) {
//             console.error("Error updating the record: " + err.stack);
//             return;
//           }
//           res.status(200).send("Update successful");
//         }
//       );
//     } catch (error) {
//       console.error("Error updating value:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },
//   deleteIndividualPlayer: async (req, res) => {
//     const player_id = req.params.player_id;
//     console.log(player_id);

//     const playerDeleteQuery = "DELETE FROM players WHERE player_id = ?";
//     const activityDeleteQuery = "DELETE FROM activity WHERE player_id = ?";

//     db.beginTransaction((err) => {
//       if (err) {
//         console.error("Error beginning transaction:", err);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }

//       // Delete player from 'players' table
//       db.query(
//         playerDeleteQuery,
//         [player_id],
//         (playerDeleteErr, playerResult) => {
//           if (playerDeleteErr) {
//             console.error("Error deleting player:", playerDeleteErr);
//             db.rollback(() => {
//               res.status(500).json({ error: "Internal server error" });
//             });
//             return;
//           }

//           if (playerResult.affectedRows === 0) {
//             // No rows affected, meaning no player was found with the given player_id
//             db.rollback(() => {
//               res.status(404).json({ message: "Player not found" });
//             });
//           } else {
//             // Player deleted successfully, now delete corresponding records in 'activity' table
//             db.query(
//               activityDeleteQuery,
//               [player_id],
//               (activityDeleteErr, activityResult) => {
//                 if (activityDeleteErr) {
//                   console.error("Error deleting activity:", activityDeleteErr);
//                   db.rollback(() => {
//                     res.status(500).json({ error: "Internal server error" });
//                   });
//                   return;
//                 }

//                 db.commit((commitErr) => {
//                   if (commitErr) {
//                     console.error("Error committing transaction:", commitErr);
//                     res.status(500).json({ error: "Internal server error" });
//                   } else {
//                     res.status(200).json({
//                       message: `Player with player_id ${player_id} and associated activities successfully deleted`,
//                     });
//                   }
//                 });
//               }
//             );
//           }
//         }
//       );
//     });
//   },
// };
