// Importiamo le librerie necessarie
const mongoose = require("mongoose");

// Importiamo i modelli Product dello productSchema e User dello userSchema
const Product = require("../models/product");
const User = require("../models/user");

// Metodo GET per visualizzare l'homepage
exports.products_get_all = (req, res, next) => {
  const { isUserLoggedIn } = res.locals;

  Product.find()
    .select("_id name price color image")
    .exec()
    .then((foundItems) => {
      res.render("home", { products: foundItems, isUserLoggedIn }); // renderizza la pagina home
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Per creare un prodotto nel db riferito alla collezione products (utilizzato con POSTMAN)
exports.products_create_product = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    name: req.body.name,
    material: req.body.material,
    color: req.body.color,
    price: req.body.price,
    details: req.body.details,
    image: req.body.image,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          material: result.material,
          color: result.color,
          price: result.price,
          details: result.details,
          image: result.image,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:4000/products" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Metodo GET per visualizzare il singolo prodotto
exports.products_get_product = (req, res, next) => {
  const { isUserLoggedIn } = res.locals;
  const id = req.params.productId;

  Product.findById(id)
    .select("name material color price details image _id")
    .exec()
    .then((foundOneCatalogItem) => {
      Product.findOne({
        _id: id, // gli viene passato l'id come path parameter
      }).exec();

      if (foundOneCatalogItem) {
        res.render("product", {
          product: foundOneCatalogItem,
          isUserLoggedIn,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Metodo PATCH per modificare un singolo prodotto nel db (utilizzato con POSTMAN)
exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated!",
        request: {
          type: "GET",
          url: "http://localhost:4000/products" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Metodo DELETE per eliminare un prodotto dal db (utilizzato con POSTMAN)
exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:4000/products",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
