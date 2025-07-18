const express = require('express');
const cors = require('cors');
const connectdb = require("./config/db");
const playerRouter = require('./routes/playerRoutes');

const app = express();


const mongoose = require('mongoose');

const cors = require("cors");
app.use(cors());

app.use(cors({
  origin: "https://cricketplayers-dashboarf-1.onrender.com/"
}));
// Middleware for JSON body parsing
app.use(express.json());

// Enable CORS for specific frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to the database
connectdb();

app.use('/api/v1/players', playerRouter);

app.listen(9210, () => {
    console.log("Server is running on port 9210");
});
