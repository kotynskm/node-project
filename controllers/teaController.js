const Tea = require("../models/teaModel");

// TEA functions
exports.getAllTeas = async (req, res) => {
  try {
    const teas = await Tea.find();

    res.status(200).json({
      status: "success",
      data: {
        teas,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTea = async (req, res) => {
  try {
    const tea = await Tea.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        tea,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
