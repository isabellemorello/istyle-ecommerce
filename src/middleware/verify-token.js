// Importiamo la libreria jsonwebtoken
const jwt = require("jsonwebtoken");

// Esportiamo il middleware per poi importarlo nelle varie routes
module.exports = function (req, res, next) {
  // Salviamo in una variabile il token generato e salvato nel cookie
  let accessToken = req.cookies.jwt;

  // Se non c'è alcun token salvato nel cookie, la request non è autorizzata
  if (!accessToken) {
    // L'utente viene riportato alla pagina di login
    return res.redirect("/users/login");
  }

  try {
    // Utilizziamo il metodo jwt.verify per verificare il token
    // Mostra un errore se il token è scaduto o se ha una signature non valida
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
    res.locals.userId = decoded._id; // qui prendiamo l'id dell'utente contenuto nel payload
    // Così l'utente ha l'autorizzazione per accedere alle risorse che hanno come requisito questo middleware
    next();
  } catch (e) {
    // Se c'è un errore ritorna un errore nella richiesta di autorizzazione
    return res.status(401).send();
  }
};
