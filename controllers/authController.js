const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    // create token using jwt sign
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    //   const email = req.body.email;
    //   const password = req.body.password;
    const { email, password } = req.body;

    // check if email and password exist
    if (!email || !password) {
      // need to implement appError error handling
      return next(err);
    }

    // check if user exists and password is correct, use +password with select, since in the user model it has a field select to hide it
    const user = await User.findOne({ email: email }).select("+password");

    // if user and wrong password
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(err);
    }

    // if all checks out, send a jwt token to client
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "That is not the correct password",
    });
  }
};
