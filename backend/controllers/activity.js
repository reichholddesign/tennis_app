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
          console.log(data);
          res.json(data);
        }
      });

      console.log(activityData);
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

  profileUpdate: async (req, res) => {
    try {
      console.log(req.body.user_id);
      let profile = req.body;
      const userId = req.body.user_id.split("|")[1];

      const updateSql = `
      UPDATE users
      SET
        first_name = IFNULL(?, first_name),
        last_name = IFNULL(?, last_name),
        dob = IFNULL(?, dob),
        height = IFNULL(?, height),
        gender = IFNULL(?, gender),
        specified_gender = IFNULL(?, specified_gender),
        hand = IFNULL(?, hand),
        rating = IFNULL(?, rating)
      WHERE user_id = ?;
      `;

      // Execute the update query
      db.query(
        updateSql,
        [
          profile.first_name,
          profile.last_name,
          profile.dob,
          profile.height,
          profile.gender,
          profile.specified_gender,
          profile.hand,
          profile.rating,
          userId,
        ],
        (err, results) => {
          if (err) {
            console.error("Error updating the record: " + err.stack);
            return;
          }
          res.status(200).send("Update successful");
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
