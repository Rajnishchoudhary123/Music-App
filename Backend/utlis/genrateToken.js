const jwt = require("jsonwebtoken");

const genrateToken = (id, res) => {
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return token;
};

module.exports = genrateToken;