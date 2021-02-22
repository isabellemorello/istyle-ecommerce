// Importiamo la libreria Express
const express = require("express");
const router = express.Router();

// Importiamo il middleware verify-token.js
const verifyToken = require("../middleware/verify-token");

// Importiamo tutte le funzioni contenute nella cartella controllers riferito a cart.js
const cartController = require("../controllers/cart");

// Metodo GET per visualizzare la route di cart, a cui vengono applicati il middleware e la funzione
router.get("/", verifyToken, cartController.cart_get_all); // il path completo è: /cart/

// Metodo POST per aggiungere un prodotto al carrello, a cui vengono applicati il middleware e la funzione
router.post("/", verifyToken, cartController.add_product_to_cart);

// Metodo DELETE per eliminare tutti gli elementi del carrello, a cui vengono applicati il middleware e la funzione
router.delete("/", verifyToken, cartController.cart_delete_all_cart);

// Metodo DELETE per cancellare un prodotto dal carrello, a cui vengono applicati il middleware e la funzione
router.delete("/:cartId", verifyToken, cartController.cart_delete_product); // il path completo è: /cart/:cartId

// Esportiamo questa route per poi importarla in app.js
module.exports = router;
