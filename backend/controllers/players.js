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
};
