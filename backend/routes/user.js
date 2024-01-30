const express = require("express");
const router = express.Router();
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const userController = require("../controllers/user.js");
const activityController = require("../controllers/activity.js");
const playersController = require("../controllers/players.js");

// router.post("/profile", userController.getProfile);
router.post("/profile", validateAccessToken, userController.getProfile);
router.post(
  "/profile-update",
  validateAccessToken,
  userController.profileUpdate
);
router.post("/activity", validateAccessToken, activityController.getActivity);
router.post(
  "/activity/:match_id",
  validateAccessToken,
  activityController.getIndividualActivity
);
router.post(
  "/activity/:match_id/update",
  validateAccessToken,
  activityController.updateIndividualActivity
);
router.delete(
  "/activity/:match_id/delete",
  validateAccessToken,
  activityController.deleteIndividualActivity
);
router.post(
  "/add-activity",
  validateAccessToken,
  activityController.addActivity
);
router.post("/players", validateAccessToken, playersController.getPlayers);
router.post("/add-player", validateAccessToken, playersController.addPlayer);

router.post(
  "/players/:player_id",
  validateAccessToken,
  playersController.getIndividualPlayer
);
router.put(
  "/players/:player_id/update",
  validateAccessToken,
  playersController.updateIndividualPlayer
);
router.delete(
  "/players/:player_id/delete",
  validateAccessToken,
  playersController.deleteIndividualPlayer
);

module.exports = router;
