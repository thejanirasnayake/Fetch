"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Phone, Moon, Sun, User, ShieldCheck, Bell } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pageTheme = darkMode ? "bg-black text-white" : "bg-white text-black";
  const cardTheme = darkMode
    ? "bg-zinc-900 border-zinc-700"
    : "bg-gray-100 border-gray-200 shadow-2xl";
  const inputTheme = darkMode
    ? "bg-zinc-800 text-white placeholder:text-gray-400"
    : "bg-white text-black placeholder:text-gray-500";
  const smallText = darkMode ? "text-gray-300" : "text-slate-700";

  if (showDashboard) {
    return (
      <main className="min-h-screen bg-white text-black px-6 py-8 pb-24">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-black text-2xl">Hello, Janira 👋</h1>
            <p className="text-sm text-gray-600 font-semibold">
              Find the best deals and save more
            </p>
          </div>
          <Bell />
        </div>

        <div className="mt-8 bg-green-50 rounded-3xl p-6 flex items-center gap-5 shadow-sm">
          <div className="bg-green-600 text-white p-5 rounded-full text-3xl">
            💰
          </div>

          <div>
            <p className="text-green-700 font-black">You Save</p>
            <h2 className="text-3xl font-black text-green-700">LKR 330</h2>
            <p className="text-sm font-bold">by choosing PickMe Food</p>
            <p className="text-green-600 text-sm font-bold">
              Cheaper and faster!
            </p>
          </div>
        </div>

        <h2 className="font-black text-xl mt-8 mb-4">Choose a Mode</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-3xl p-5 text-center shadow-sm">
            <div className="text-5xl">🛵</div>
            <h3 className="font-black mt-3">Food Delivery</h3>
          </div>

          <div className="border rounded-3xl p-5 text-center shadow-sm">
            <div className="text-5xl">🛍️</div>
            <h3 className="font-black mt-3">Product Shopping</h3>
          </div>
        </div>

        <h2 className="font-black text-xl mt-8 mb-4">Recent Searches</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-2xl p-4 font-bold shadow-sm">🍗 KFC</div>
          <div className="border rounded-2xl p-4 font-bold shadow-sm">
            🍕 Pizza Hut
          </div>
        </div>

        <BottomNav />
      </main>
    );
  }

  return (
    <main className={`min-h-screen transition ${pageTheme}`}>
      <AnimatePresence>
        {showSplash ? (
          <motion.section
            key="splash"
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 p-4 rounded-full">
                <Coins className="text-black w-10 h-10" />
              </div>
              <h1 className="text-6xl font-black">FETCH</h1>
            </div>

            <p className={`mt-6 font-bold ${smallText}`}>Get The Best Deals</p>
          </motion.section>
        ) : (
          <section className="min-h-screen flex items-center justify-center px-6 py-10 relative">
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

            <div className="w-full max-w-md">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="bg-yellow-400 p-3 rounded-full">
                  <Coins className="text-black w-8 h-8" />
                </div>
                <h1 className="text-5xl font-black tracking-wide">FETCH</h1>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-4xl font-black">
                  {authMode === "login" ? "Welcome" : "Create Account"}
                </h2>
                <p className={`mt-4 font-semibold ${smallText}`}>
                  Get The Best Deals
                </p>
              </div>

              <div className={`rounded-3xl p-7 border ${cardTheme}`}>
                <div
                  className={`flex rounded-2xl p-1 mb-7 ${
                    darkMode ? "bg-zinc-800" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => setAuthMode("login")}
                    className="flex-1 py-4 rounded-xl font-black transition bg-green-500 text-white shadow-lg"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setAuthMode("signup")}
                    className="flex-1 py-4 rounded-xl font-black transition bg-green-500 text-white shadow-lg"
                  >
                    Sign Up
                  </button>
                </div>

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

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-black hover:bg-green-600 transition shadow-lg">
                      Send OTP
                    </button>

                    <button className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-black hover:bg-green-600 transition shadow-lg">
                      Confirm
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowDashboard(true)}
                  className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl font-black text-lg text-white shadow-lg"
                >
                  {authMode === "login" ? "Continue" : "Create Account"}
                </button>

                <p className={`text-center mt-6 text-sm font-semibold ${smallText}`}>
                  {authMode === "login"
                    ? "New here? Tap Sign Up to create an account."
                    : "Already have an account? Tap Login."}
                </p>
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>
    </main>
  );
}