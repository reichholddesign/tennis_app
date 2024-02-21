const express = require("express");
const playerRouter = express.Router();
const { validateAccessToken } = require("../middleware/auth0.middleware.js");
const playersController = require("../controllers/players.js");

playerRouter.get(
  "/:user_id/",
  validateAccessToken,
  playersController.getPlayers
);

playerRouter.get(
  "/individual-player/:player_id",
  validateAccessToken,
  playersController.getIndividualPlayer
);

playerRouter.put(
  "/individual-player/:player_id/update",
  validateAccessToken,
  playersController.updateIndividualPlayer
);
playerRouter.delete(
  "/individual-player/:player_id/delete",
  validateAccessToken,
  playersController.deleteIndividualPlayer
);

playerRouter.post(
  "/:user_id/add-player",
  validateAccessToken,
  playersController.addPlayer
);

module.exports = playerRouter;
