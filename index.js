const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes/apiRoutes"));

app.get("/", (req, res) => {
  res.json({
    message: "Hello, world",
  });
});

db.audioDetail
  .sync({ force: false })
  .then(() => {
    console.log("db connected.");
  })
  .catch((error) => {
    console.log("error in connection with db.");
  });
app.listen(port, () => {
  console.log("listening on port " + port);
});
