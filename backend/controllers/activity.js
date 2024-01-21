const db = require("../config/db");

module.exports = {
  getActivity: async (req, res) => {
    try {
      const user = req.body;
      const userId = user.userId.split("|")[1];
      const checkQuery = "SELECT * FROM activity WHERE user_id = ?";
      const activityData = db.query(checkQuery, [userId], (err, data) => {
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
  getIndividualActivity: async (req, res) => {
    try {
      const matchId = req.body.match_id;
      const checkQuery = "SELECT * FROM activity WHERE match_id = ?";
      const indvidualActivityData = db.query(
        checkQuery,
        [matchId],
        (err, data) => {
          if (err) {
            // 500 Internal Server Error - indicates a server-side error
            res.status(500).send(err);
          } else {
            // Data retrieved successfully - return with 200 OK
            console.log(data);
            res.json(data);
          }
        }
      );

      console.log(indvidualActivityData);
    } catch (err) {
      console.log(err);
    }
  },

  addActivity: async (req, res) => {
    console.log("hi");
    try {
      const activity = req.body;
      const userId = activity.user_id.split("|")[1];
      console.log(activity.location);
      const values = [
        userId,
        activity.date,
        activity.opponent,
        activity.type,
        activity.format,
        activity.score,
        activity.surface,
        activity.outcome,
        activity.location,
      ];
      console.log(activity.location);
      const insertQuery =
        "INSERT INTO activity (user_id, date, opponent,type,format,score,surface,outcome,location) VALUES (?, ?, ?,?, ?, ?,?,?,?)";
      const indvidualActivityData = db.query(
        insertQuery,
        values,
        (err, data) => {
          if (err) {
            console.log(err.message);
            // 500 Internal Server Error - indicates a server-side error
            res.status(500).send(err);
          } else {
            // Data retrieved successfully - return with 200 OK
            console.log(data);
            res.json(data);
          }
        }
      );

      console.log(indvidualActivityData);
    } catch (err) {
      console.log(err);
    }
  },

  updateIndividualActivity: async (req, res) => {
    const acivity = req.body;

    try {
      // Update the specific value in the record
      const updateSql = `
          UPDATE activity
          SET
            date = IFNULL(?, date),
            opponent = IFNULL(?, opponent),
            type = IFNULL(?, type),
            format = IFNULL(?, format),
            score = IFNULL(?, score),
            surface = IFNULL(?, surface),
            outcome = IFNULL(?, outcome),
            location = IFNULL(?, location)
          WHERE match_id = ?;
          `;
      await db.query(
        updateSql,
        [
          acivity.date,
          acivity.opponent,
          acivity.type,
          acivity.format,
          acivity.score,
          acivity.surface,
          acivity.outcome,
          acivity.location,
          acivity.match_id,
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
  deleteIndividualActivity: async (req, res) => {
    const match_id = req.params.match_id;

    const query = "DELETE FROM activity WHERE match_id = ?";

    db.query(query, [match_id], (err, result) => {
      if (err) {
        console.error("Error deleting activity:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (result.affectedRows === 0) {
        // No rows affected, meaning no row was found with the given match_id
        res.status(404).json({ message: "Activity not found" });
      } else {
        // Activity deleted successfully
        res
          .status(200)
          .json({
            message: `Activity with match_id ${match_id} successfully deleted`,
          });
      }
    });
  },
};
