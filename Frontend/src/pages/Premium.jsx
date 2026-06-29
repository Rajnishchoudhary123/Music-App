import { FaCrown, FaCheckCircle, FaMusic } from "react-icons/fa";
import axios from "../Context/axios";

const Premium = () => {
  const subscribe = async () => {
    try {
      const { data } = await axios.post("/api/payment/subscribe");
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-5">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-green-500/20 blur-[140px] rounded-full top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full bottom-0 right-0"></div>

      <div className="relative w-full max-w-lg">

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Premium Badge */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full flex items-center gap-2 font-semibold text-black">
              <FaCrown />
              PREMIUM PLAN
            </div>
          </div>

          {/* Icon */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <FaMusic className="text-4xl text-black" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center mt-6">
            Upgrade Your Music
          </h1>

          <p className="text-gray-400 text-center mt-3">
            Enjoy an uninterrupted listening experience with premium features.
          </p>

          {/* Price */}
          <div className="mt-8 text-center bg-gradient-to-r from-green-500/20 to-purple-500/20 border border-green-500/20 rounded-2xl py-6">

            <p className="text-gray-400 uppercase tracking-widest text-sm">
              Monthly Plan
            </p>

            <div className="mt-2">
              <span className="text-6xl font-extrabold">₹99</span>
              <span className="text-gray-400 text-lg"> /month</span>
            </div>

          </div>

          {/* Features */}
          <div className="mt-8 space-y-4">

            {[
              "Unlimited premium songs",
              "Ad-free music experience",
              "High quality audio (320kbps)",
              "Offline downloads (Coming Soon)",
              "Priority customer support",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5"
              >
                <FaCheckCircle className="text-green-400 text-lg" />
                <span>{feature}</span>
              </div>
            ))}

          </div>

          {/* Button */}
          <button
            onClick={subscribe}
            className="group mt-8 w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40"
          >
            <span className="group-hover:tracking-wider transition-all">
              Subscribe Now 🚀
            </span>
          </button>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-5">
            Secure payments • Cancel anytime • Instant activation
          </p>

        </div>

      </div>

    </div>
  );
};

export default Premium;