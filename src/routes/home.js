// Importiamo la libreria Express
const express = require("express");
const router = express.Router();

// Importiamo il middleware user-logged-in.js
const userLoggedIn = require("../middleware/user-logged-in");

// Importiamo tutte le funzioni contenute nella cartella controllers riferito a products.js
const productsController = require("../controllers/products");

// Metodo GET per visualizzare la route della homepage, a cui vengono applicati il middleware e la funzione
router.get("/", userLoggedIn, productsController.products_get_all);

// Esportiamo questa route per poi importarla in app.js
module.exports = router;
