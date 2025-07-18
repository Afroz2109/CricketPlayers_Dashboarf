const express = require('express');
const router = express.Router();
const {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');

router.get('/get-players', getPlayers);
router.post('/add-players', addPlayer);
router.put('/update-player/:id', updatePlayer);
router.delete('/delete-player/:id', deletePlayer);

module.exports = router;
