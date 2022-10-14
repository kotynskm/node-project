const User = require("../models/userModel");

// USERS functions
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not yet defined",
  });
};
