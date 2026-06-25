const jwt = require("jsonwebtoken");

const genrateToken = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,     
    sameSite: "none", 
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

module.exports = genrateToken;