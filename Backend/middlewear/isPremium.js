const isPremium = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  if (!req.user.isPremium) {
    return res.status(403).json({
      message: "Premium required",
    });
  }

  next();
};

module.exports = isPremium;