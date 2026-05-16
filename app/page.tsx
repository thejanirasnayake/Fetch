"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  Phone,
  Moon,
  Sun,
  User,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pageTheme = darkMode
    ? "bg-black text-white"
    : "bg-white text-black";

  const cardTheme = darkMode
    ? "bg-zinc-900 border-zinc-700"
    : "bg-gray-100 border-gray-200 shadow-2xl";

  const inputTheme = darkMode
    ? "bg-zinc-800 text-white placeholder:text-gray-400"
    : "bg-white text-black placeholder:text-gray-500";

  const smallText = darkMode
    ? "text-gray-300"
    : "text-slate-700";

  return (
    <main className={`min-h-screen transition ${pageTheme}`}>
      <AnimatePresence>
        {showSplash ? (
          <motion.section
            key="splash"
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="bg-yellow-400 p-4 rounded-full">
                <Coins className="text-black w-10 h-10" />
              </div>

              <h1 className="text-6xl font-black">
                FETCH
              </h1>
            </motion.div>

            <p className={`mt-6 font-bold ${smallText}`}>
              Get The Best Deals
            </p>
          </motion.section>
        ) : (
          <section className="min-h-screen flex items-center justify-center px-6 py-10 relative">
            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute top-6 right-6 p-3 rounded-full border ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-yellow-400"
                  : "bg-gray-100 border-gray-300 text-black"
              }`}
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md"
            >
              {/* LOGO */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="bg-yellow-400 p-3 rounded-full">
                  <Coins className="text-black w-8 h-8" />
                </div>

                <h1 className="text-5xl font-black tracking-wide">
                  FETCH
                </h1>
              </div>

              {/* TITLE */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black">
                  {authMode === "login"
                    ? "Welcome Back"
                    : "Create Account"}
                </h2>

                <p className={`mt-4 font-semibold ${smallText}`}>
                  Get The Best Deals
                </p>
              </div>

              {/* CARD */}
              <div className={`rounded-3xl p-7 border ${cardTheme}`}>
                {/* TOGGLE */}
                <div
                  className={`flex rounded-2xl p-1 mb-7 ${
                    darkMode ? "bg-zinc-800" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => setAuthMode("login")}
                    className={`flex-1 py-4 rounded-xl font-black transition ${
                      authMode === "login"
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-green-500 text-white shadow-lg"
                    }`}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setAuthMode("signup")}
                    className={`flex-1 py-4 rounded-xl font-black transition ${
                      authMode === "signup"
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-green-500 text-white shadow-lg"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* SIGNUP ONLY */}
                {authMode === "signup" && (
                  <>
                    <div className="mb-5">
                      <label className={`text-sm font-bold ${smallText}`}>
                        First Name
                      </label>

                      <div
                        className={`flex items-center gap-3 rounded-2xl px-4 py-4 mt-2 ${inputTheme}`}
                      >
                        <User className="text-gray-400 w-5 h-5" />

                        <input
                          placeholder="Enter first name"
                          className="bg-transparent outline-none w-full"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className={`text-sm font-bold ${smallText}`}>
                        Last Name
                      </label>

                      <div
                        className={`flex items-center gap-3 rounded-2xl px-4 py-4 mt-2 ${inputTheme}`}
                      >
                        <User className="text-gray-400 w-5 h-5" />

                        <input
                          placeholder="Enter last name"
                          className="bg-transparent outline-none w-full"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* PHONE */}
                <div className="mb-5">
                  <label className={`text-sm font-bold ${smallText}`}>
                    Phone Number
                  </label>

                  <div
                    className={`flex items-center gap-3 rounded-2xl px-4 py-4 mt-2 ${inputTheme}`}
                  >
                    <Phone className="text-gray-400 w-5 h-5" />

                    <input
                      placeholder="+94 77 123 4567"
                      className="bg-transparent outline-none w-full"
                    />
                  </div>
                </div>

                {/* OTP */}
                <div className="mb-6">
                  <label className={`text-sm font-bold ${smallText}`}>
                    OTP Code
                  </label>

                  <div
                    className={`flex items-center gap-3 rounded-2xl px-4 py-4 mt-2 ${inputTheme}`}
                  >
                    <ShieldCheck className="text-gray-400 w-5 h-5" />

                    <input
                      placeholder="Enter OTP"
                      className="bg-transparent outline-none w-full"
                    />
                  </div>

                  {/* OTP BUTTONS */}
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-black hover:bg-green-600 transition shadow-lg">
                      Send OTP
                    </button>

                    <button className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-black hover:bg-green-600 transition shadow-lg">
                      Confirm
                    </button>
                  </div>
                </div>

                {/* CONTINUE */}
                <Link href="/dashboard">
                  <button className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl font-black text-lg text-white shadow-lg">
                    {authMode === "login"
                      ? "Continue"
                      : "Create Account"}
                  </button>
                </Link>

                {/* FOOTER */}
                <p className={`text-center mt-6 text-sm font-semibold ${smallText}`}>
                  {authMode === "login"
                    ? "New here? Tap Sign Up to create an account."
                    : "Already have an account? Tap Login."}
                </p>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </main>
  );
}