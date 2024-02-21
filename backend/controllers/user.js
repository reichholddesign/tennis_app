const db = require("../config/db");
const executeQuery = require("../utils/executeQuery");

module.exports = {
  getProfile: async (req, res) => {
    const user_id = decodeURI(req.params.user_id);

    try {
      const checkQuery = "SELECT * FROM users WHERE user_id = ?";
      const userData = await executeQuery(checkQuery, [user_id]);
      if (userData.length === 0) {
        return res.json({ user: false });
      }
      res.json({ user: true, userData: userData });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createProfile: async (req, res) => {
    const profile = req.body;
    const user_id = decodeURI(req.params.user_id);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const imgUrl = profile.profile_img_url.split(",")[0];
    const imgAlt = profile.profile_img_url.split(",")[1];
    try {
      const insertSql = `
        INSERT INTO users (user_id, created, updated, first_name, last_name, gender, specified_gender, hand, rating, profile_img_url, profile_img_alt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      // Execute the insert query
      const insert = await executeQuery(insertSql, [
        user_id,
        date,
        date,
        profile.first_name,
        profile.last_name || null,
        profile.gender || null,
        profile.gender !== "Other" ? null : profile.specified_gender,
        profile.hand || null,
        profile.rating || null,
        imgUrl || null,
        imgAlt || null,
      ]);

      res.status(201).json({ message: "Profile created successfully" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
  },

  updateProfile: async (req, res) => {
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
          gender = IFNULL(?, gender),
          specified_gender = ?,
          hand = IFNULL(?, hand),
          rating = IFNULL(?, rating),
          profile_img_url = IFNULL(?, profile_img_url)

        WHERE user_id = ?;
      `;

      // Execute the update query
      const update = await executeQuery(updateSql, [
        date,
        profile.first_name,
        profile.last_name,
        profile.gender,
        profile.gender !== "Other" ? null : profile.specified_gender,
        profile.hand,
        profile.rating === "" ? null : profile.rating,
        profile.profile_img_url,
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
