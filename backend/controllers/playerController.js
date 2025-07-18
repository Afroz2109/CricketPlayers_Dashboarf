const Player = require('../Models/playerModel');

const getPlayers = async (req, res) => {
  try {
    const data = await Player.find({});
    res.status(200).send({
      success: true,
      message: "Players data fetched successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching players" });
  }
};

const addPlayers = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, role, available } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !phone || !role || available === undefined) {
      return res.status(400).send({
        success: false,
        message: "Each field is mandatory"
      });
    }

    // Add new player
    await new Player({
      first_name,
      last_name,
      email,
      phone,
      role,
      available
    }).save();

    res.status(200).send({
      success: true,
      message: "Player added successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding player" });
  }
};

const updatePlayer = async (req, res) => {
    try {
      const id = req.params.id;
      await Player.updateOne({ _id: id }, { $set: req.body });
      res.status(200).send({
        success: true,
        message: "Player updated successfully"
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error updating player" });
    }
}
  

const deletePlayer = async (req, res) => {
    try {
      const id = req.params.id;
      
      // Check if the player exists before deleting
      const player = await Player.findById(id);
      if (!player) {
        return res.status(404).json({ success: false, message: "Player not found" });
      }
      
      // Delete the player
      await Player.deleteOne({ _id: id });
      
      res.status(200).json({ success: true, message: "Player deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error deleting player" });
    }
  };
  
module.exports = { getPlayers, addPlayers, updatePlayer, deletePlayer };
  

// module.exports = { getPlayers, addPlayers, updatePlayer, deletePlayer };
