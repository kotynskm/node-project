const Tea = require("../models/teaModel");

exports.getOverview = async (req, res) => {
  // get all tea information from collections
  const teas = await Tea.find();
  // render template using the tour data
  res.status(200).render("overview", {
    title: "All Teas",
    teas,
  });
};

exports.getTea = async (req, res) => {
  // get tea by ID
  const tea = await Tea.findById(req.params.id);

  res.status(200).render("tea", {
    title: `${tea.name}`,
    tea,
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your Account",
  });
};
