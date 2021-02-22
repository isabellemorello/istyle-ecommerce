// Importiamo le librerie necessarie
const { Console } = require("console");
const mongoose = require("mongoose");
const cart = require("../models/cart");
const Cart = require("../models/cart");
const { findById } = require("../models/product");
const Product = require("../models/product");
const User = require("../models/user");

// Metodo GET per visualizzare il carrello
exports.cart_get_all = async (req, res, next) => {
  const { userId } = res.locals;

  try {
    const foundUserCart = await Cart.find({ user: userId }).exec();
    const foundUser = await User.findById(userId).exec();
    if (foundUserCart) {
      const items = []; // è un array vuoto finchè non si aggiunge qualcosa
      let numberItems = 0;
      let cartTotal = 0;
      for await (const cartItem of foundUserCart) {
        const item = await Product.findOne({ _id: cartItem.product }).exec();

        if (item) {
          item.quantity = cartItem.quantity;
          item.size = cartItem.size;
          numberItems += cartItem.quantity;
          cartTotal += item.price * cartItem.quantity;
          items.push(item); // una volta che l'articolo (id) dentro il catalogo è stato trovato viene inserito con "push" dentro l'array items
        }
      }
      console.log(foundUserCart);

      res.render("cart", {
        user: foundUser,
        cartUserId: userId,
        cartItems: items,
        numberItems,
        cartTotal,
        cartUser: foundUserCart,
        isUserLoggedIn: true,
      }); // mi mostri gli articoli nel carrello
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Metodo POST per aggiungere un prodotto al carrello
exports.add_product_to_cart = async (req, res, next) => {
  try {
    const { userId } = res.locals;
    const { productId, size, quantity } = req.body; //Prendiamo tramite l'attributo name (in scheda prodotto) i valori dei tag degli input
    const cartItem = await Cart.findOne({ product: productId }).exec();

    if (quantity && userId) {
      // In base alla quantità selezionata aumenta o riduce la quantità precedente
      await Cart.updateOne(
        { _id: cartItem._id },
        { $set: { quantity: quantity } }
      );
    } else if (cartItem && userId) {
      // Se l'articolo è già presente nel carrello, aumenta la quantità di 1
      await Cart.updateOne(
        { _id: cartItem._id },
        { $set: { size: size, quantity: cartItem.quantity + 1 } }
      );
    } else {
      // Aspettiamo che venga creato il documento passato a create()
      await Cart.create({
        user: userId,
        product: productId,
        size: size,
        quantity: 1,
      });
    }
    // e poi facciamo il redirect verso il path /cart
    res.redirect("/cart");
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// Metodo DELETE per cancellare un prodotto dal carrello
exports.cart_delete_product = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    await Cart.deleteOne({
      product: cartId,
    });
    res.status(200).end("Success");
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Metodo DELETE per eliminare tutti gli elementi del carrello
exports.cart_delete_all_cart = async (req, res, next) => {
  const { userId } = res.locals;

  try {
    await Cart.deleteMany({
      user: userId,
    });
    res.status(200).end("Success");
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
