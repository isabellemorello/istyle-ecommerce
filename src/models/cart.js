const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: String,
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
