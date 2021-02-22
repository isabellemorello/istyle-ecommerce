// Importiamo le librerie necessarie
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importiamo il modello User dello userSchema
const User = require("../models/user");

// Metodo GET per visualizzare la pagina di registrazione
exports.user_get_signup = async (req, res, next) => {
  const { isUserLoggedIn } = res.locals;
  res.render("signup", { isUserLoggedIn });
};

// Metodo POST per registrarsi
exports.user_signup = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  // Se la mail è già presente nel db, direziona l'utente nella pagina che segnala un errore durante la registrazione
  if (user) {
    return res.redirect("/users/signup/error");
  }

  try {
    // Fa un hashing della password inserita dall'utente, con un salt di 10
    const hash = await bcrypt.hash(req.body.password, 10);
    // Creo un nuovo utente salvando la password criptata seguendo lo userSchema di User
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
      city: req.body.city,
      address: req.body.address,
      phone: req.body.phone,
    });

    await newUser.save();
    // Viene generato un token
    const token = await newUser.generateAuthToken();
    // Il token viene salvato in un cookie che ha durata di un'ora e l'utente viene rendirizzato alla homepage
    return res
      .cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }) // Invio il token al lato client dentro un cookie
      .redirect("/");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Metodo GET per visualizzare la pagina di registrazione con l'errore della email già esistente
exports.user_get_signup_error = async (req, res, next) => {
  const { isUserLoggedIn } = res.locals;
  res.render("signup-mail-exists", { isUserLoggedIn });
};

// Metodo GET per visualizzare la pagina di login
exports.user_get_login_page = (req, res, next) => {
  const { isUserLoggedIn } = res.locals;
  res.render("login", { isUserLoggedIn });
};

// Metodo POST per fare il login
exports.user_login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.redirect("/users/login/error");
    }

    // Comparazione tra la password inserita dal'utente nel form e la password già salvata nel db, attraverso una funzione della libreria bcrypt
    const sentPasswordMatchesUserPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // Se l'email e la password sono corrette si genera un token
    if (sentPasswordMatchesUserPassword) {
      const token = await user.generateAuthToken();

      return res
        .cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }) // Invio il token al lato client dentro un cookie
        .redirect("/");
    } else {
      res.redirect("/users/login/error");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Metodo GET per visualizzare la pagina di login-error
exports.user_get_login_page_error = (req, res, next) => {
  const { isUserLoggedIn } = res.locals;
  res.render("login-error", { isUserLoggedIn });
};

// Metodo GET per visualizzare il profile
exports.user_get_profile = async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const foundUser = await User.findById(userId).exec();
    // se trova l'utente nella collezione users nel database
    if (foundUser) {
      res.render("profile", { user: foundUser, isUserLoggedIn: true }); // renderizza la pagina del profilo dell'utente
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Metodo GET per visualizzare lo users/me/account
exports.user_get_myAccount = async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const foundUser = await User.findById(userId).exec();

    if (foundUser) {
      res.render("account", {
        // renderizza la pagina account dell'utente
        myAccount: foundUser,
        user: foundUser,
        isUserLoggedIn: true,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Metodo GET per visualizzare lo users/me/orders
exports.user_get_myOrders = async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const foundUser = await User.findById(userId).exec();

    if (foundUser) {
      res.render("orders", {
        // renderizza la pagina ordini dell'utente
        myOrders: foundUser,
        user: foundUser,
        isUserLoggedIn: true,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Metodo GET per fare il logout
exports.user_logout = async (req, res, next) => {
  const { isUserLoggedIn } = res.locals;
  const accessToken = req.cookies.jwt; // Andiamo a prendere il token contenuto nel cookie che si chiama jwt

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY); // verifica se la chiave segreta possa generare questo specifico token (accessToken)
    const userId = decoded._id; // dal payload andiamo a prendere l'id dell'utente

    const foundUser = await User.findById(userId).exec(); // cerco l'utente con quel dato id
    const validTokens = foundUser.tokens.filter(
      // facciamo un filtraggio dove prendiamo tutti i token tranne l'accessToken del dispositivo da cui stiamo facendo logout
      (tokenItem) => tokenItem.token !== accessToken
    );

    await foundUser.update({ tokens: validTokens }); // ora questo array che ha tutti i token tranne l'accessToken deve essere aggiornato nel database

    res.clearCookie("jwt").render("logout", {
      // il cookie viene cancellato
      user: foundUser,
      isUserLoggedIn,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
