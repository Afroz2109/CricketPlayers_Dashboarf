const express= require('express');

const playerRouter= express.Router();

playerRouter.get('/get-players');

playerRouter.post('/add-players');

playerRouter.put('/update-player');

playerRouter.delete('/delete-player');

module.exports= playerRouter;