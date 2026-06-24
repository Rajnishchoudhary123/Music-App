import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../Context/user';
import { FcGoogle } from "react-icons/fc";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, buttonLoading } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate);
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-purple-900 text-white p-6">

    {/* LOGIN CARD */}
    <div className="
      w-full max-w-md
      bg-[#0f0f0f]/80
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-8
      shadow-[0_0_60px_rgba(0,0,0,0.7)]
    ">

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-center">
        🎵 Music App
      </h1>

      <p className="text-center text-gray-400 mt-2">
        Log in to continue listening
      </p>

      {/* FORM */}
      <form className="space-y-4 mt-8" onSubmit={submitHandler}>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full p-3
            rounded-xl
            bg-[#1a1a1a]
            border border-white/10
            text-white
            focus:outline-none
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            transition
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full p-3
            rounded-xl
            bg-[#1a1a1a]
            border border-white/10
            text-white
            focus:outline-none
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            transition
          "
        />

        
        <button
  type="button"
  onClick={() => {
    window.location.href = "http://localhost:5000/api/auth/google";
  }}
  className="
    w-full
    flex items-center justify-center gap-3
    border border-white/20
    bg-[#111]
    hover:bg-[#1a1a1a]
    text-white
    font-medium
    py-3
    rounded-full
    transition
  "
>
  <FcGoogle className="text-xl" />
  Continue with Google
</button>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={buttonLoading}
          className="
            w-full
            bg-gradient-to-r from-green-500 to-emerald-600
            text-black
            font-bold
            py-3
            rounded-full
            hover:scale-[1.02]
            transition
            shadow-lg
            hover:shadow-green-500/30
          "
        >
          {buttonLoading ? "Please wait..." : "Login"}
        </button>

      </form>

      {/* SIGNUP */}
      <p className="text-gray-400 text-center mt-6 text-sm">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-green-400 hover:underline"
        >
          Sign up
        </Link>
      </p>

    </div>

  </div>
);
};

export default Login;