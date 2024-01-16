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
};
