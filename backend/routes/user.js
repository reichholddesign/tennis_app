const express = require("express");
const userRouter = express.Router();
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const userController = require("../controllers/user.js");

userRouter.get(
  "/:user_id/profile",
  validateAccessToken,
  userController.getProfile
);

// userRouter.post(
//   "/:user_id/profile/create",
//   validateAccessToken,
//   userController.createProfile
// );
userRouter.put(
  "/:user_id/profile/update",
  validateAccessToken,
  userController.updateProfile
);

module.exports = userRouter;
