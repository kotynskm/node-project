const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const util = require("util");
require("util.promisify").shim();
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // additional authorization using cookie only, accessed from jwt property on the cookie object
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

exports.login = async (req, res, next) => {
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
    return next(new AppError("Incorrect email or password", 401));
  }

  // if all checks out, send a jwt token to client
  createSendToken(user, 200, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
// only for rendered pages, verify if a user is logged in
exports.isLoggedIn = async (req, res, next) => {
  // verify token
  if (req.cookies.jwt) {
    try {
      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // check if user exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // there is a logged in user
      res.locals.user = currentUser; // this will allow us to access variable inside pug templates (use res.locals)
      return next();
    } catch (err) {
      return next();
    }
  }
  // if there is no cookie
  next();
};
