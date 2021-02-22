const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let accessToken = req.cookies.jwt;

  // se non c'è alcun token salvato nel cookie, la request non è autorizzata
  if (!accessToken) {
    // return res.status(403).send();
    return res.redirect("/users/login");
  }

  try {
    // utilizzo il metodo jwt.verify per verificare il token
    // mostra un errore se il token è scaduto o se ha una signature non valida
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
    res.locals.userId = decoded._id;
    next();
  } catch (e) {
    // se c'è un errore ritorna una request di non autorizzazione
    return res.status(401).send();
  }
};
