// Importiamo la libreria mongoose
const mongoose = require("mongoose");

// Importiamo MONGOOSE_CONNECTION dal file .env
const mongoose_connection = process.env.MONGOOSE_CONNECTION;

// Avviamo la connessione a MongoDB attraverso la libreria Mongoose
mongoose.connect(
  mongoose_connection,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected to DB");
    }
  }
);
