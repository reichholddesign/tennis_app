const db = require("../config/db");
const executeQuery = require("../utils/executeQuery");

module.exports = {
  getProfile: async (req, res) => {
    const user_id = decodeURI(req.params.user_id);

    try {
      const checkQuery = "SELECT * FROM users WHERE user_id = ?";
      const userData = await executeQuery(checkQuery, [user_id]);
      if (userData.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(userData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  profileUpdate: async (req, res) => {
    const profile = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const user_id = decodeURI(req.params.user_id);
    try {
      const updateSql = `
        UPDATE users
        SET
          updated = ?,
          first_name = IFNULL(?, first_name),
          last_name = IFNULL(?, last_name),
          dob = IFNULL(?, dob),
          height = IFNULL(?, height),
          gender = IFNULL(?, gender),
          specified_gender = ?,
          hand = IFNULL(?, hand),
          rating = IFNULL(?, rating)
        WHERE user_id = ?;
      `;

      // Execute the update query
      const update = await executeQuery(updateSql, [
        date,
        profile.first_name,
        profile.last_name,
        profile.dob,
        profile.height,
        profile.gender,
        profile.gender !== "Other" ? null : profile.specified_gender,
        profile.hand,
        profile.rating,
        user_id,
      ]);
      if (update.affectedRows === 0) {
        return res.status(404).json({ message: "Update failed" });
      }
      res.status(200).send("Update successful");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
  },
};
