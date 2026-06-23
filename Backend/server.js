const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary');

const connectDB = require('./Database/db.js');

const UserRoutes = require('./routes/UserRouter.js');
const SongRoutes = require('./routes/SongRoutes.js');
const PaymentRoutes = require('./routes/PaymentRoutes.js');
const AuthRoutes = require('./routes/AuthRoutes.js');
const AdminRoutes = require('./routes/AdminDashboardRoutes.js');
const likeRoutes = require('./routes/likeRoutes.js');

const passport = require("passport");
require("./config/passport");

const { stripeWebhook } = require('./Controller/PaymentController');

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API
});

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors({
  origin: [
    "http://localhost:5173",
    "https://music-frontend-git-main-rajnishs-projects-d3a1a552.vercel.app"
  ],
  credentials: true,
}));

server.post(
    "/api/payment/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

server.get("/", (req, res) => {
    res.send("Server is running");
});

server.use(express.json());
server.use(cookieParser());
server.use(passport.initialize());


server.use("/api/user", UserRoutes, likeRoutes);
server.use("/api/songs", SongRoutes);
server.use("/api/payment", PaymentRoutes);
server.use("/api/auth", AuthRoutes);
server.use("/api/admin", AdminRoutes);

connectDB();

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
