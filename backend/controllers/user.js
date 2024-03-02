const db = require("../config/db");
const axios = require("axios").default;

const executeQuery = require("../utils/executeQuery");

module.exports = {
  getProfile: async (req, res) => {
    const user_id = decodeURI(req.params.user_id);

    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`,
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${process.env.AUTH0_TEST_TOKEN}`,
        },
      };

      const response = await axios.request(config);

      res.json({
        user: true,
        userData: [
          {
            name: response.data.name,
            family_name: response.data.family_name,
            picture: response.data.picture,
            ...response.data.user_metadata,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },

  // createProfile: async (req, res) => {
  //   const profile = req.body;
  //   const user_id = decodeURI(req.params.user_id);
  //   const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  //   const imgUrl = profile.profile_img_url.split(",")[0];
  //   const imgAlt = profile.profile_img_url.split(",")[1];
  //   try {
  //     const insertSql = `
  //       INSERT INTO users (user_id, created, updated, first_name, last_name, gender, specified_gender, hand, rating, profile_img_url, profile_img_alt)
  //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  //     `;

  //     // Execute the insert query
  //     const insert = await executeQuery(insertSql, [
  //       user_id,
  //       date,
  //       date,
  //       profile.first_name,
  //       profile.last_name || null,
  //       profile.gender || null,
  //       profile.gender !== "Other" ? null : profile.specified_gender,
  //       profile.hand || null,
  //       profile.rating || null,
  //       imgUrl || null,
  //       imgAlt || null,
  //     ]);

  //     res.status(201).json({ message: "Profile created successfully" });
  //   } catch (err) {
  //     console.log(err);
  //     res
  //       .status(500)
  //       .json({ error: "Internal server error", message: err.message });
  //   }
  // },

  updateProfile: async (req, res) => {
    const profile = req.body;
    const user_id = decodeURI(req.params.user_id);
    let data;

    for (let key in profile) {
      if (key === "name") {
        data = { ...data, name: profile[key] };
      } else if (key === "family_name") {
        data = { ...data, family_name: profile[key] };
      } else if (key === "picture") {
        // Removed the extra space after "profile_img_url"
        data = { ...data, picture: profile[key] };
      } else {
        // Check if user_metadata already exists in data, if not, create it
        if (!data.user_metadata) {
          data.user_metadata = {};
        }
        // Use the value of key as the key in user_metadata
        data.user_metadata[key] = profile[key];
      }
    }
    const options = {
      method: "PATCH",
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.AUTH0_TEST_TOKEN}`,
        "cache-control": "no-cache",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
};
