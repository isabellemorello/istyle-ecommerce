// Importiamo tutte le librerie necessarie
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path"); // per lavorare con i percorsi di file e cartelle
require("./db/db");

const app = express();
const port = process.env.PORT; // importiamo PORT dal file .env

// Importiamo le varie route
const homeRoutes = require("./routes/home");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/users");

// Utilizziamo le varie librerie
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

// Middleware per gestire le CORS policies e dare l'accesso ad ogni origin (*)
// Ci assicura di evitare CORS errors da browser
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // OPTIONS è un verbo HTTP, alla pari di GET, POST....
  if (req.method === "OPTIONS") {
    // ci dà l'accesso al metodo HTTP usato nella richiesta che se è uguale alle Options del browser invierà sempre prima l'options request quando si fa una richiesta di tipo POST o PUT
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //si dice a header quali metodi accettare
    return res.status(200).json({});
  }
  next();
});

// Route che gestiscono le richieste HTTP
app.use("/", homeRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);

// Lanciamo il server alla porta 4000
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

// Per gestire gli Errori
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404; // client error
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500); // server error
  res.json({
    error: {
      message: error.message,
    },
  });
});
