// Importiamo la libreria Mongoose
const mongoose = require("mongoose");

// Definiamo lo schema della collezione carts in MongoDB
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

// Esportiamo il modello Cart definito da cartSchema
module.exports = mongoose.model("Cart", cartSchema);
