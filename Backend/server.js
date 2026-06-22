const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary');

const connectDB = require('../Backend/Database/db.js');

const UserRoutes = require('../Backend/routes/UserRouter.js');
const SongRoutes = require('../Backend/routes/SongRoutes.js');
const PaymentRoutes = require('../Backend/routes/PaymentRoutes.js');
const AuthRoutes = require('../Backend/routes/AuthRoutes.js');
const AdminRoutes = require('../Backend/routes/AdminDashboardRoutes.js');
const incrementPlayCount = require('../Backend/routes/AdminDashboardRoutes.js')
const DeleteUser = require('../Backend/routes/UserRouter.js');
const AddNewSong = require('../Backend/routes/SongRoutes.js')
const passport = require("passport");
require("./config/passport");
const { stripeWebhook } = require('../Backend/Controller/PaymentController');


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API
});

const server = express();
const PORT = process.env.PORT;

server.use(cors({
    origin: ["http://localhost:5173", "https://music-app123.vercel.app"],
    credentials: true
}));

server.post(
    "/api/payment/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

server.use(express.json());
server.use(cookieParser());


server.use(passport.initialize());

server.use("/api/user", UserRoutes ,DeleteUser  );
server.use("/api/songs", SongRoutes , incrementPlayCount , AddNewSong );
server.use("/api/payment", PaymentRoutes);
server.use("/api/auth", AuthRoutes);
server.use("/api/admin" ,AdminRoutes   );

connectDB();

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});