const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Salvo in una variabile il token generato e salvato nel cookie
  let accessToken = req.cookies.jwt;

  //Se non è presente alcun token nel cookie, la request non ottiene l'autorizzazione
  if (!accessToken) {
    // la res ritorna una variabile booleana false
    res.locals.isUserLoggedIn = false;
    return next();
  }

  try {
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
    res.locals.isUserLoggedIn = !!decoded._id; // bang operator: trasforma un truthy-value nel valore booleano TRUE
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    return res.status(401).send();
  }
};
