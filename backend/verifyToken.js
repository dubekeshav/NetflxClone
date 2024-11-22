const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) res.status(404).json("Token is not valid!");
      req.user = userInfo;
      next();
    });
  } else {
    return res.status(401).json("You are not authorized");
  }
}

module.exports = verify;
