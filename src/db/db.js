const mongoose = require("mongoose");
// const mongo_pass = process.env.MONGO_PASS;
// const mongo_DB = proces.env.MONGO_DB;
const mongoose_connection = process.env.MONGOOSE_CONNECTION;
// const mongo_pass = "UniPordenone";
// const mongo_DB = "ecommerceProdDb";

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
