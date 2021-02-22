// Importiamo la libreria jsonwebtoken
const jwt = require("jsonwebtoken");

// Esportiamo il middleware per poi importarlo nelle varie routes
module.exports = function (req, res, next) {
  // Salviamo in una variabile il token generato e salvato nel cookie
  let accessToken = req.cookies.jwt;

  //Se non è presente alcun token nel cookie, la request non ottiene l'autorizzazione
  if (!accessToken) {
    // la response ritorna una variabile booleana false
    res.locals.isUserLoggedIn = false;
    return next();
  }

  try {
    // Utilizziamo il metodo jwt.verify per verificare il token
    // Mostra un errore se il token è scaduto o se ha una signature non valida
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
    res.locals.isUserLoggedIn = !!decoded._id; // doppio bang operator: trasforma un truthy-value nel valore booleano TRUE.
    // Così l'utente è loggato.
    next();
  } catch (e) {
    // Se c'è un errore ritorna un errore nella richiesta di autorizzazione
    return res.status(401).send();
  }
};
