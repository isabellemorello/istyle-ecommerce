const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const cartController = require("../controllers/cart");

router.get("/", verifyToken, cartController.orders_get_all);

router.get("/:cartId", verifyToken, cartController.orders_get_order);

router.post("/", verifyToken, cartController.add_product_to_cart);

router.delete("/", verifyToken, cartController.orders_delete_all_cart);

router.delete("/:cartId", verifyToken, cartController.orders_delete_order);

module.exports = router;
