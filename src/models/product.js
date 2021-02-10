const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  material: String,
  color: String,
  price: Number,
  details: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
