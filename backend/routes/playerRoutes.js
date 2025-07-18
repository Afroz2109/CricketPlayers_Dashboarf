const express = require('express');

const cors = require('cors');

const { getPlayers, addPlayers, updatePlayer, deletePlayer } = require('../controllers/playerController');

const playerRouter = express.Router();


playerRouter.get('/get-players', getPlayers);
playerRouter.post('/add-players', addPlayers);
playerRouter.put('/update-player/:id', updatePlayer);  
playerRouter.delete('/delete-player/:id', deletePlayer);  

module.exports = playerRouter;
