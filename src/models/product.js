// Importiamo la libreria Mongoose
const mongoose = require("mongoose");

// Definiamo lo schema della collezione products in MongoDB
const productSchema = mongoose.Schema({
  name: String,
  material: String,
  color: String,
  price: Number,
  details: String,
  image: String,
});

// Esportiamo il modello Product definito da productSchema
module.exports = mongoose.model("Product", productSchema);
