require("dotenv").config();
const AWS = require("aws-sdk");
const db = require("../models");
const { getAudioDurationInSeconds } = require("get-audio-duration");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
});

// const uploadAudio = async (filename, bucketName, file, mimetype) => {
//   const params = {
//     Key: filename,
//     Bucket: bucketName,
//     Body: file,
//     ContentType: mimetype,
//   };

//   await s3.upload(params, (error, data) => {
//     if (error) {
//       return error;
//     } else {
//       return data.Location;
//     }
//   });
// };

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
  console.log(process.env.BUCKETNAME);
  const bucketName = process.env.BUCKETNAME;
  // const data = await uploadAudio(
  //   req.file.originalname,
  //   bucketName,
  //   req.file.buffer,
  //   req.file.mimetype
  // );
  if (!req.file) {
    res.send("please select one audio file");
  }

  const params = {
    Key: req.file.originalname,
    Bucket: bucketName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.send(error);
      return;
    } else {
      var fileData = data;

      getAudioDurationInSeconds(fileData.Location).then((duration) => {
        db.audioDetail
          .create({
            audioFileName: fileData.Key,
            audioFilePath: fileData.Location,
            duration: duration,
          })
          .then((record) => {
            if (!record || record.length === 0) {
              return res.send("No data inserted");
            }
            res.send(record);
          })
          .catch((err) => {
            res.send({ error: "error in inserting data" + err.message });
          });
      });
    }
  });
  // res.send(data);
};

const getAudio = (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.audioDetail
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      if (!data || data.length === 0) {
        res.send("No Data found");
        return;
      }
      res.send(data);
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
