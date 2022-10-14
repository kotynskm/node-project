const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a user name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    // converts email entry to lowercase
    lowercase: true,
    // validates email using npm package validator
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    // use validate and create a function to check that password matches confirm password, custom validators only work on SAVE and CREATE
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

// implement password encryption middleware
userSchema.pre("save", async function (next) {
  // if password has not been modified, just return the next middleware
  if (!this.isModified("password")) return next();

  // hash the password asynchronously using bcrypt package, the higher the cost number the more intensive and better the password encryption will be
  this.password = await bcrypt.hash(this.password, 12);
  // delete the confirm password from the db by setting it to undefined
  this.passwordConfirm = undefined;
  next();
});
// create the User Model
const User = mongoose.model("User", userSchema);

// export User Model
module.exports = User;
