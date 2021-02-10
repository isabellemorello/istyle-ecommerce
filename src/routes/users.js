const express = require("express");
const router = express.Router();

// Middleware per verificare se l'uttente è loggato
const userLoggedIn = require("../middleware/user-logged-in");
// Middleware per verificare se l'utente ha l'autorizzazione ad accedere a determinate pagine
const verifyToken = require("../middleware/verify-token");
// Importo il file contenente tutte le funzioni riguardanti l'utente: registrazione, login, logout
const userController = require("../controllers/users");

// Router per fare la registrazione
router.get("/signup", userLoggedIn, userController.user_get_signup);
router.post("/signup", userController.user_signup);

// Router della pagina di registrazione, che compare quando l'utente fa un errore
router.get("/signup/error", userLoggedIn, userController.user_get_signup_error);
router.post("/signup/error", userController.user_signup);

// Router della pagina del login
router.get("/login", userLoggedIn, userController.user_get_login_page);
router.post("/login", userController.user_login);

// Router della pagina di login, che compare quando l'utente fa un errore
router.get(
  "/login/error",
  userLoggedIn,
  userController.user_get_login_page_error
);
router.post("/login/error", userController.user_login);

// Router per la pagina del profilo
router.get("/me", verifyToken, userController.user_get_profile);

// Router per la pagina dedicata alla visualizzazione dei dati dell'utente
router.get("/me/account", verifyToken, userController.user_get_myAccount);

// Router per la pagina degli ordini
router.get("/me/orders", verifyToken, userController.user_get_myOrders);

// Per fare il logout
router.get("/logout", verifyToken, userController.user_logout);

router.delete("/:userId", verifyToken, userController.user_logout);

module.exports = router;
