const express = require("express");
const playerRouter = express.Router();
const { validateAccessToken } = require("../middleware/auth0.middleware.js");
const playersController = require("../controllers/players.js");

playerRouter.get(
  "/:user_id/players",
  validateAccessToken,
  playersController.getPlayers
);

playerRouter.get(
  "/players/:player_id",
  validateAccessToken,
  playersController.getIndividualPlayer
);

playerRouter.put(
  "/players/:player_id/update",
  validateAccessToken,
  playersController.updateIndividualPlayer
);
playerRouter.delete(
  "/players/:player_id/delete",
  validateAccessToken,
  playersController.deleteIndividualPlayer
);

playerRouter.post(
  "/:user_id/add-player",
  validateAccessToken,
  playersController.addPlayer
);

module.exports = playerRouter;
