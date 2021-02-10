const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_KEY_ACCESS = process.env.JWT_KEY_ACCESS;
const JWT_KEY_REFRESH = process.env.JWT_KEY_REFRESH;

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
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    // validate: (value) => {
    //   if (!validator.isEmail(value)) {
    //     throw new Error({ error: "Invalid Email address" });
    //   }
    // },
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
  // const payload = { _id: user._id };
  // funzione jwt per definire il token jwt, passandogli il payload (_id) e la chiave segreta (tokenJwt)
  let token = jwt.sign({ _id: user._id }, JWT_KEY_ACCESS); // nuovo token
  // let refreshToken = jwt.sign(payload, JWT_KEY_REFRESH, { expiresIn: "2h" }); // nuovo token

  user.tokens = user.tokens.concat({ token }); // Concateno la chiave "tokens" di userSchema con il nuovo token creato
  await user.save();

  // res.cookie("jwt", token, { secure: true, httpOnly: true }); // Invio accessToken al lato client dentro un cookie

  // res.send();
  return token;
};

module.exports = mongoose.model("User", userSchema);
