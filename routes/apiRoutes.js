const express = require("express");
require("dotenv").config();

const route = express.Router();
const {
  getAllAudios,
  addAudio,
  getAudio,
} = require("../controller/audioController");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const uploads = multer({ storage });

route.get("/getAudios", getAllAudios);
route.post("/addAudio", uploads.single("audioFile"), addAudio);
route.get("/getAudio/:id", getAudio);

module.exports = route;
