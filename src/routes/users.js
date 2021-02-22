// Importiamo la libreria Express
const express = require("express");
const router = express.Router();

// Middleware per verificare se l'uttente è loggato
const userLoggedIn = require("../middleware/user-logged-in");
// Middleware per verificare se l'utente ha l'autorizzazione ad accedere a determinate pagine
const verifyToken = require("../middleware/verify-token");

// Importo il file contenente tutte le funzioni riguardanti l'utente: registrazione, login, logout
const userController = require("../controllers/users");

// Metodo GET per visualizzare la pagina di registrazione, a cui vengono applicati il middleware e la funzione
router.get("/signup", userLoggedIn, userController.user_get_signup);
// Metodo POST per fare la registrazione, a cui viene applicata la funzione
router.post("/signup", userController.user_signup);

// Metodo GET per vislualizzare la pagina di registrazione, che compare quando l'utente fa un errore, a cui vengono applicati il middleware e la funzione
router.get("/signup/error", userLoggedIn, userController.user_get_signup_error);
// Metodo POST per fare la registrazione nella pagina relativa all'errore, a cui viene applicata la funzione
router.post("/signup/error", userController.user_signup);

// Metodo GET per visualizzare la pagina del login, a cui vengono applicati il middleware e la funzione
router.get("/login", userLoggedIn, userController.user_get_login_page);
// Metodo POST per fare il login, a cui viene applicata la funzione
router.post("/login", userController.user_login);

// Metodo GET per visualizzare la pagina di login, che compare quando l'utente fa un errore, a cui vengono applicati il middleware e la funzione
router.get(
  "/login/error",
  userLoggedIn,
  userController.user_get_login_page_error
);
// Metodo POST per fare il login nella pagina relativa all'errore, a cui viene applicata la funzione
router.post("/login/error", userController.user_login);

// Metodo GET per visualizzare la pagina del profilo, a cui vengono applicati il middleware e la funzione
router.get("/me", verifyToken, userController.user_get_profile);

// Metodo GET per visualizzare la pagina dedicata alla visualizzazione dei dati dell'utente, a cui vengono applicati il middleware e la funzione
router.get("/me/account", verifyToken, userController.user_get_myAccount);

// Metodo GET per visualizzare la pagina degli ordini, a cui vengono applicati il middleware e la funzione
router.get("/me/orders", verifyToken, userController.user_get_myOrders);

// Metodo GET per visualizzare la pagina del logout, a cui vengono applicati il middleware e la funzione
router.get("/logout", verifyToken, userController.user_logout);

// Esportiamo questa route per poi importarla in app.js
module.exports = router;
