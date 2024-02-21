const express = require("express");
const activityRouter = express.Router();
const { validateAccessToken } = require("../middleware/auth0.middleware.js");
const activityController = require("../controllers/activity.js");

activityRouter.get(
  "/:user_id/",
  validateAccessToken,
  activityController.getActivity
);

activityRouter.get(
  "/indvidual-activity/:activity_id",
  validateAccessToken,
  activityController.getIndividualActivity
);

activityRouter.put(
  "/individual-activity/:activity_id/update",
  validateAccessToken,
  activityController.updateIndividualActivity
);

activityRouter.delete(
  "/individual-activity/:activity_id/delete",
  validateAccessToken,
  activityController.deleteIndividualActivity
);

activityRouter.post(
  "/:user_id/add-activity",
  validateAccessToken,
  activityController.addActivity
);

module.exports = activityRouter;
