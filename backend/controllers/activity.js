const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Utility function to handle database queries
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
  getActivity: async (req, res) => {
    try {
      const userId = decodeURI(req.params.user_id);
      const activityQuery = `
  SELECT activity.*, players.first_name, players.last_name
  FROM activity
  JOIN players ON activity.player_id = players.player_id
  WHERE activity.user_id = ?
`;

      // Execute the query
      const activityData = await executeQuery(activityQuery, [userId]);

      res.json(activityData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  },

  getIndividualActivity: async (req, res) => {
    try {
      const activityId = req.params.activity_id;
      // const checkQuery = "SELECT * FROM activity WHERE activity_id = ?";
      console.log(activityId);
      const checkQuery = `
      SELECT activity.*, players.first_name, players.last_name
      FROM activity
      JOIN players ON activity.player_id = players.player_id
      WHERE activity.activity_id = ?
    `;

      const individualActivityData = await executeQuery(checkQuery, [
        activityId,
      ]);
      res.json(individualActivityData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  },

  addActivity: async (req, res) => {
    try {
      const activity = req.body;
      const activityUuid = uuidv4();
      const values = [
        activityUuid,
        decodeURI(req.params.user_id),
        activity.player_id,
        activity.date,
        activity.type,
        activity.format,
        activity.score,
        activity.surface,
        activity.outcome,
        activity.location,
      ];

      const insertQuery =
        "INSERT INTO activity (activity_id, user_id, player_id,  date, type, format, score, surface, outcome, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await executeQuery(insertQuery, values);
      res.json({ message: "Activity added successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  },

  updateIndividualActivity: async (req, res) => {
    try {
      const activity = { ...req.body, activity_id: req.params.activity_id };
      console.log(activity);
      const updateSql = `
        UPDATE activity
        SET
          date = IFNULL(?, date),
          player_id = IFNULL(?, player_id),
          type = IFNULL(?, type),
          format = IFNULL(?, format),
          score = IFNULL(?, score),
          surface = IFNULL(?, surface),
          outcome = IFNULL(?, outcome),
          location = IFNULL(?, location)
        WHERE activity_id = ?;
      `;

      await executeQuery(updateSql, [
        activity.date,
        activity.player_id,
        activity.type,
        activity.format,
        activity.score,
        activity.surface,
        activity.outcome,
        activity.location,
        activity.activity_id,
      ]);
      res.json({ message: "Activity added successfully" });
    } catch (error) {
      console.error("Error updating value:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteIndividualActivity: async (req, res) => {
    try {
      const activityId = req.params.activity_id;
      const query = "DELETE FROM activity WHERE activity_id = ?";
      const result = await executeQuery(query, [activityId]);

      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Activity not found" });
      } else {
        res.status(200).json({
          message: `Activity with id ${activityId} successfully deleted`,
        });
      }
    } catch (err) {
      console.error("Error deleting activity:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

// const activityQuery = "SELECT * FROM activity WHERE user_id = ?";
// const activityData = await executeQuery(activityQuery, [userId]);
// const playersQuery = "SELECT * FROM players WHERE user_id = ?";
// const playersData = await executeQuery(playersQuery, [userId]);

//   const activityQuery = `
//   SELECT activity.*, players.first_name, players.last_name
//   FROM activity
//   JOIN players ON activity.player_id = players.player_id
//   WHERE activity.user_id = ?
// `;
