const db = require("../models");
const getAllAudios = (req, res) => {
  db.audioDetail.findAll().then((data) => {
    if (!data || data.length === 0) {
      res.send("No data Found");
      return;
    }
    res.send(data);
  });
};

const addAudio = (req, res) => {
  console.log(req.file);
  console.log(req.body);
};

const getAudio = (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  db.audioDetail
    .findOne({ id: id })
    .then((data) => {
      if (!data || data.length === 0) {
        res.send("No Data found");
        return;
      }
      res.send(data.audioFilePath);
    })
    .catch((error) => {
      res.send("Error in getting audio", error.message);
    });
};

module.exports = {
  getAllAudios,
  addAudio,
  getAudio,
};
