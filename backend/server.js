const express = require('express');
const cors = require('cors');
const connectdb = require("./config/db");
const playerRouter = require('./routes/playerRoutes');

const app = express();
const mongoose = require('mongoose');

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cricketplayers-dashboarf-1.onrender.com"
  ]
}));

//  Middleware to parse JSON
app.use(express.json());

//  Connect to DB
connectdb();

//  Routes
app.use('/api/v1/players', playerRouter);

//  Use Render-compatible PORT
const PORT = process.env.PORT || 9210;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
