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
        first_login: response.data.user_metadata.first_login,

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
    console.log("profile ", profile);
    const user_id = decodeURI(req.params.user_id);
    let data = {
      name: profile.name || "User",
      family_name: profile.family_name || null,
      user_metadata: {
        gender: profile.gender || null,
        specified_gender: profile.specified_gender || null,
        hand: profile.hand || null,
        rating: profile.rating || null,
        profile_complete: true,
      },
    };

    if (
      profile?.picture &&
      profile?.picture.length > 0 &&
      profile?.picture.includes(",")
    ) {
      data = {
        ...data,
        picture: profile.picture.split(",")[0],
        user_metadata: {
          ...data.user_metadata,
          image_alt: profile.picture.split(",")[1],
        },
      };
    }

    console.log(data);
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
      res.status(200).send("Update successful");
    } catch (error) {
      console.error(error);
    }
  },
};
