// Importiamo la libreria Express
const express = require("express");
const router = express.Router();

// Importiamo i middleware user-logged-in.js e verify-token.js
const verifyToken = require("../middleware/verify-token");
const userLoggedIn = require("../middleware/user-logged-in");

// Importiamo tutte le funzioni contenute nella cartella controllers riferito a products.js
const productsController = require("../controllers/products");

// Per creare un prodotto nel db riferito alla collezione products (utilizzato con POSTMAN)
router.post("/", productsController.products_create_product);

// Metodo GET per visualizzare il singolo prodotto, a cui vengono applicati il middleware e la funzione
router.get(
  "/:productId",
  userLoggedIn,
  productsController.products_get_product
);

// Metodo PATCH per modificare un singolo prodotto nel db (utilizzato con POSTMAN)
router.patch(
  "/:productId",
  verifyToken,
  productsController.products_update_product
);

// Metodo DELETE per eliminare un prodotto dal db (utilizzato con POSTMAN)
router.delete(
  "/:productId",
  verifyToken,
  productsController.products_delete_product
);

// Esportiamo questa route per poi importarla in app.js
module.exports = router;
