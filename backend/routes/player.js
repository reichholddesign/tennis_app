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

module.exports = router;
