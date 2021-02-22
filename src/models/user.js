// Importiamo le librerie necessarie
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Importiamo la chiave segreta JWT_KEY dal file .env
const JWT_KEY = process.env.JWT_KEY;

// Definiamo lo schema della collezione users in MongoDB
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, // espressione RegExp, l'email deve contenere tutti questi elementi
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  tokens: [
    // chiave tokens
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: Number,
});

// Ogni volta che viene creato un utente viene chiamata la funzione che genera il token jwt e che ritorna il token
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  // funzione jwt per definire il token jwt, passandogli il payload (_id) e la chiave segreta (JWT_KEY)
  let token = jwt.sign({ _id: user._id }, JWT_KEY); // nuovo token

  user.tokens = user.tokens.concat({ token }); // Concateno la chiave "tokens" di userSchema con il nuovo token creato
  await user.save();

  return token;
};

// Esportiamo il modello User definito da userSchema
module.exports = mongoose.model("User", userSchema);
