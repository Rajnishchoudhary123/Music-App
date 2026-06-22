const express = require('express');
const isAuth = require('../middlewear/isAuth');
const { createSubscription, getPremiumSongs } = require('../Controller/PaymentController');
const isPremium = require('../middlewear/isPremium');

const router = express.Router();

router.post("/subscribe", isAuth, createSubscription);

router.get("/premium", isAuth, isPremium, getPremiumSongs);

module.exports = router;