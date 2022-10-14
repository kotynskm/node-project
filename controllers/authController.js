const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    // create token using jwt sign
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

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

exports.login = (req, res, next) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    // need to implement appError error handling
    return next(err);
  }

  // check if user exists and password is correct
  const user = User.findOne({ email: email });

  // if all checks out, send a jwt token to client
  const token = "";
  res.status(200).json({
    status: "success",
    token,
  });
};
