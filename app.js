const express = require("express");
const morgan = require("morgan");
// initialize app
const app = express();

app.set("view engine", "ejs");

// MIDDLEWARE
// morgan 'dev' gives us information back about the response when a route is called
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// parses incoming JSON requests and puts the parsed data in req
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
