const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user");
const Song = require("../models/Song");
const TryCatch = require("../utlis/TryCatch");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createSubscription = TryCatch(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    client_reference_id: req.user._id.toString(),
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });
});

exports.stripeWebhook = async (req, res) => {
  console.log("=== STRIPE WEBHOOK HIT ===");

  const sig = req.headers["stripe-signature"];
  console.log("signature:", !!sig);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("event type:", event.type);
  } catch (error) {
    console.log("Webhook Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;

    console.log("checkout.session.completed fired");
    console.log("userId from session:", userId);
    console.log("customer:", session.customer);
    console.log("subscription:", session.subscription);

    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          isPremium: true,
          premiumSince: new Date(),
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        },
        { new: true }
      );

      console.log("UPDATED USER:", updatedUser);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;

    console.log("subscription deleted:", subscription.id);

    await User.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        isPremium: false,
        premiumSince: null,
        stripeSubscriptionId: null,
      }
    );
  }

  res.status(200).json({ received: true });
};

exports.getPremiumSongs = TryCatch(async (req, res) => {
  const songs = await Song.find({ premium: true });

  res.status(200).json({
    success: true,
    songs,
  });
});

exports.cancelSubscription = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (!user.stripeSubscriptionId) {
    return res.status(400).json({
      success: false,
      message: "No active subscription found",
    });
  }

  // Stripe subscription cancel
  await stripe.subscriptions.cancel(user.stripeSubscriptionId);

  // DB update
  user.isPremium = false;
  user.stripeSubscriptionId = null;
  user.premiumSince = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Subscription cancelled successfully",
  });
});