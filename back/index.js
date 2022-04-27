const express = require("express");
const app = express();
const PORT = 5000;
const routes = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/schtroumpf", () => {
    console.log("Successfully connected to database");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log("App listening into port " + PORT);
});

app.use("/api", routes);
