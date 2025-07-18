const express = require('express');
const {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer
} = require('../controllers/playerController'); // Adjust the path if needed

const playerRouter = express.Router();

playerRouter.get('/get-players', getPlayers);
playerRouter.post('/add-players', addPlayer);
playerRouter.put('/update-player/:id', updatePlayer);
playerRouter.delete('/delete-player/:id', deletePlayer);

module.exports = playerRouter;
