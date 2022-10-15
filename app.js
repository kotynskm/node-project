const express = require("express");
const morgan = require("morgan");
const path = require("path");
// import routers from route file
const teaRouter = require("./routes/teaRoutes");
const userRouter = require("./routes/userRoutes");

// initialize app
const app = express();
// set pug as view engine
app.set("view engine", "pug");
// use path to get dir name and join with views to allow access to views folder
app.set("views", path.join(__dirname, "views"));
// serving static files
app.use(express.static(path.join(__dirname, "public")));

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
app.get("/", (req, res) => {
  res.status(200).render("base", {
    tea: "Honey Boba Tea",
    user: "kailey",
  });
});

// ROUTER ROUTES
app.use("/api/v1/teas", teaRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
