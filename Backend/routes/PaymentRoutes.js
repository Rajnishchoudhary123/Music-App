const express = require("express");
const isAuth = require("../middlewear/isAuth");
const isPremium = require("../middlewear/isPremium");
const {
  createSubscription,
  getPremiumSongs,
  cancelSubscription,
} = require("../Controller/PaymentController");

const router = express.Router();

router.post("/subscribe", isAuth, createSubscription);
router.get("/premium", isAuth, isPremium, getPremiumSongs);
router.post("/cancel-subscription", isAuth, cancelSubscription);

module.exports = router;