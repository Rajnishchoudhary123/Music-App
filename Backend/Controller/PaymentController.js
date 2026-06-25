const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user");
const Song = require("../models/Song");
const TryCatch = require("../utlis/TryCatch");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createSubscription = TryCatch(async (req, res) => {
  console.log("=== CREATE SUBSCRIPTION HIT ===");
  console.log("req.user =>", req.user);
  console.log("CLIENT_URL =>", process.env.CLIENT_URL);
  console.log("STRIPE_PRICE_ID =>", process.env.STRIPE_PRICE_ID);

  if (!req.user || !req.user._id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: "Missing STRIPE_SECRET_KEY in .env",
    });
  }

  if (!process.env.STRIPE_PRICE_ID) {
    return res.status(500).json({
      success: false,
      message: "Missing STRIPE_PRICE_ID in .env",
    });
  }

  if (!process.env.CLIENT_URL) {
    return res.status(500).json({
      success: false,
      message: "Missing CLIENT_URL in .env",
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const successUrl = `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.CLIENT_URL}/cancel-subscription`;

  console.log("SUCCESS URL =>", successUrl);
  console.log("CANCEL URL =>", cancelUrl);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: user._id.toString(),
  });

  return res.status(200).json({
    success: true,
    url: session.url,
  });
});