require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

// création serveur
const app = express();
app.use(cors());
app.use(express.json());

//se connecter à MongoDB
mongoose.connect("mongodb://localhost/gamepaddb");

//importer les routes
const userRoutes = require("./routes/user.js");
app.use(userRoutes);

app.get("/", async (req, res) => {
  try {
    const genre = Number(req.query.genres)
      ? req.query.genres
      : "4,10,5,2,3,7,15";
    const platforms = Number(req.query.platforms)
      ? req.query.platforms
      : "4,187,1,18,186,7,3,21";
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.query.search}&page=${req.query.page}&page_size=${req.query.page_size}&genres=${genre}&platforms=${platforms}&dates=${req.query.dates}&ordering=${req.query.ordering}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/game/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json("game route not found");
  }
});

app.get("/game/:id/game-series", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}/game-series?key=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json("game-series route not found");
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started ✌️");
});

// app.listen(4000, () => {
//   console.log("Server has started ✌️");
// });
