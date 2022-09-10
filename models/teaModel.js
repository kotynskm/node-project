const mongoose = require("mongoose");

const { Schema } = mongoose;

// create a schema for tea data
const teaSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
});

// create tea model
const Tea = mongoose.model("Tea", teaSchema);
// export tea model
module.exports = Tea;
