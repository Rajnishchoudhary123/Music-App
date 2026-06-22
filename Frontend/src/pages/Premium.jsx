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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-purple-900 text-white p-6">

    
    <div className="
      w-full max-w-md
      bg-[#0f0f0f]/80
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-8
      text-center
      shadow-[0_0_50px_rgba(168,85,247,0.2)]
    ">

     
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Music Premium 
      </h1>

      <p className="text-gray-400 mt-3">
        Unlock unlimited music without restrictions 🎧
      </p>

     
      <div className="
        mt-6
        bg-[#1a1a1a]
        border border-white/10
        rounded-2xl
        p-5
      ">
        <p className="text-sm text-gray-400">Only</p>
        <h2 className="text-3xl font-bold text-white mt-1">
          ₹99 <span className="text-sm text-gray-400">/ month</span>
        </h2>
      </div>

      
      <div className="mt-6 text-left space-y-2 text-sm text-gray-300">

        <p>✔ Unlimited premium songs</p>
        <p>✔ Ad-free experience</p>
        <p>✔ High quality audio</p>
        <p>✔ Offline listening (coming soon)</p>

      </div>

  
      <button
        onClick={subscribe}
        className="
          mt-8
          w-full
          bg-gradient-to-r from-green-500 to-emerald-600
          text-black
          font-bold
          py-3
          rounded-full
          hover:scale-105
          transition
          shadow-lg
          hover:shadow-green-500/30
        "
      >
        Subscribe Now
      </button>

      <p className="text-xs text-gray-500 mt-4">
        Cancel anytime • Secure payment
      </p>

    </div>

  </div>
);
};

export default Premium;