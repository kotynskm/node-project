const express = require("express");
const morgan = require("morgan");
// import routers from route file
const teaRouter = require("./routes/teaRoutes");
const userRouter = require("./routes/userRoutes");

// initialize app
const app = express();
// set EJS as view engine
app.set("view engine", "ejs");

// MIDDLEWARE
// morgan 'dev' gives us information back about the response when a route is called
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// parses incoming JSON requests and puts the parsed data in req
app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("index");
// });

// ROUTER
app.use("/api/v1/teas", teaRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
