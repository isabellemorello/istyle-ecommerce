const express = require("express");
const userLoggedIn = require("../middleware/user-logged-in");
const router = express.Router();

const productsController = require("../controllers/products");

router.get("/", userLoggedIn, productsController.products_get_all);

module.exports = router;
