const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.cookies["access-token"];
  if (token) {
    const validToken = jwt.verify(token, process.env.JWT_SECRET)
    if (validToken) {
      console.log("validToken", validToken);
      res.user = validToken.id;
      res.json({ user: { id: validToken.userId } });
    } else {
      console.log("TOKEN EXPIRES")
      res.json(false);
    };
  } else {
    console.log("TOKEN NOT FOUND")
    res.json(false)
  }
};

const logOut = (req, res) => {
  res.cookie("access-token", "", { maxAge: 3600 * 1000 });
  res.json(true);
};

module.exports = {
  validateToken,
  logOut,
};