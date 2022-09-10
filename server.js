// require the config file to access env variables
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// save connection string to variable and replace password placeholder with db password
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// use mongoose connect to connect to the db
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// app must be read after the config of the dotenv variables
const app = require("./app");

// use the process.env variable if there is one set, otherwise use port 3000
const port = process.env.PORT || 3000;
// listen to port
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
