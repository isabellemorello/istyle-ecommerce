const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");
const verifyToken = require("../middleware/verify-token");
const userLoggedIn = require("../middleware/user-logged-in");

const productsController = require("../controllers/products");

// router.get("/", productsController.products_get_all);

// upload.single -> Prova a parsare un solo singolo file
router.post("/", productsController.products_create_product);

router.get(
  "/:productId",
  userLoggedIn,
  productsController.products_get_product
);

router.patch(
  "/:productId",
  verifyToken,
  productsController.products_update_product
);

router.delete(
  "/:productId",
  verifyToken,
  productsController.products_delete_product
);

module.exports = router;
