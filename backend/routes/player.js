const express = require("express");
const router = express.Router();
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const playerController = require("../controllers/player");
const activityController = require("../controllers/activity");

// router.post("/profile", playerController.getProfile);
router.post("/profile", validateAccessToken, playerController.getProfile);
router.post(
  "/profile-update",
  validateAccessToken,
  playerController.profileUpdate
);
router.post("/activity", validateAccessToken, activityController.getActivity);
router.post(
  "/activity/:match_id",
  validateAccessToken,
  activityController.getIndividualActivity
);

module.exports = router;
