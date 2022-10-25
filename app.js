const express = require("express");
const morgan = require("morgan");
const path = require("path");
// import routers from route file
const teaRouter = require("./routes/teaRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

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
// parses data from cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// test middleware
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
// app.get("/", (req, res) => {
//   res.render("index");
// });
app.use("/", viewRouter);
app.use("/api/v1/teas", teaRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
