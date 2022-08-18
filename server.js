require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// création serveur
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      // `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.query.search}`
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.query.search}&page=${indexPage}&page_size=30`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ error: error.message });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started ✌️");
});
