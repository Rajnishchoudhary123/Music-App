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
  console.log("FRONTEND_URL =>", process.env.FRONTEND_URL);
  console.log("STRIPE_PRICE_ID =>", process.env.STRIPE_PRICE_ID);
  console.log("STRIPE_SECRET_KEY exists =>", !!process.env.STRIPE_SECRET_KEY);

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

  if (!process.env.FRONTEND_URL) {
    return res.status(500).json({
      success: false,
      message: "Missing FRONTEND_URL in .env",
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
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
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      client_reference_id: user._id.toString(),
      metadata: {
        userId: user._id.toString(),
        email: user.email,
      },
    });

    console.log("Stripe session created:", session.id);

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log("STRIPE SESSION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.stripeWebhook = async (req, res) => {
  console.log("=== STRIPE WEBHOOK HIT ===");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId =
        session.client_reference_id || session.metadata?.userId;

      console.log("checkout.session.completed fired");
      console.log("userId:", userId);

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

      await User.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        {
          isPremium: false,
          premiumSince: null,
          stripeSubscriptionId: null,
        }
      );
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.log("WEBHOOK PROCESSING ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
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

  await stripe.subscriptions.cancel(user.stripeSubscriptionId);

  user.isPremium = false;
  user.stripeSubscriptionId = null;
  user.premiumSince = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Subscription cancelled successfully",
  });
});