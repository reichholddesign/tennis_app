const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Utility function to handle database queries
const executeQuery = async (query, params) => {
  try {
    const [rows] = await db.query(query, params);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getActivity: async (req, res) => {
    try {
      const userId = req.body.userId.split("|")[1];
      const activityQuery = "SELECT * FROM activity WHERE user_id = ?";
      const activityData = await executeQuery(activityQuery, [userId]);
      const playersQuery = "SELECT * FROM players WHERE user_id = ?";
      const playersData = await executeQuery(playersQuery, [userId]);
      res.json({ activityData: activityData, playersData: playersData });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  },

  getIndividualActivity: async (req, res) => {
    try {
      const activityId = req.body.activity_id;
      const checkQuery = "SELECT * FROM activity WHERE activity_id = ?";
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
      const userId = activity.user_id.split("|")[1];
      const activityUuid = uuidv4();
      console.log(activity.player_id);
      const values = [
        activityUuid,
        userId,
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
      const activity = req.body;
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
      res.status(200).send("Update successful");
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
