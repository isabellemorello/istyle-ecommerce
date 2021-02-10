const jwt = require("jsonwebtoken");
const JWT_KEY_ACCESS = process.env.JWT_KEY_ACCESS;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, JWT_KEY_ACCESS);
    req.userData = decoded; // aggiunge all'oggetto request la proprietà userData che contiene il token decodificato
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
