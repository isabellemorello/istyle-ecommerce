const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let accessToken = req.cookies.jwt;

  //if there is no token stored in cookies, the request is unauthorized
  if (!accessToken) {
    // return res.status(403).send();
    return res.redirect("/users/login");
  }

  try {
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
    res.locals.userId = decoded._id;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    return res.status(401).send();
  }
};
