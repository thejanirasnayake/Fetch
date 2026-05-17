"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Moon,
  Sun,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  WalletCards,
  MapPin,
  CircleDollarSign,
  TrendingDown,
  Zap,
  Loader2,
} from "lucide-react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  const sendOTP = async () => {
    if (!phone.trim()) {
      alert("Please enter your WhatsApp number");
      return;
    }

    try {
      setSendingOtp(true);

      const response = await fetch(
        "https://thejaniras.app.n8n.cloud/webhook/fetch-compare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "sendOtp",
            phone: phone.trim(),
          }),
        }
      );

      const text = await response.text();
      console.log("n8n raw response:", text);

      if (!text) {
        alert("Failed to send OTP. Empty response from n8n.");
        return;
      }

      const data = JSON.parse(text);
      alert("OTP from backend is: " + data.otp);
      console.log("n8n parsed response:", data);

      
      if (!data.success) {
        alert("Failed to send OTP");
        return;
      }

      localStorage.setItem("fetch_otp", String(data.otp));
      alert("OTP sent to WhatsApp!");
    } catch (error) {
      console.error(error);
      alert("Could not connect to OTP backend");
    } finally {
      setSendingOtp(false);
    }
  };

  const confirmOTP = async () => {
    const savedOtp = localStorage.getItem("fetch_otp");
  
    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }
  
    try {
      setVerifyingOtp(true);
  
      if (String(otp).trim() === String(savedOtp).trim()) {
        localStorage.removeItem("fetch_otp");
        alert("Login Success!");
        window.location.href = "/dashboard";
      } else {
        alert("Invalid OTP");
        console.log("Typed OTP:", otp);
        console.log("Saved OTP:", savedOtp);
      }
    } catch (error) {
      console.error(error);
      alert("OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const pageTheme = darkMode
    ? "bg-black text-white"
    : "bg-[#F5F7F5] text-black";

  const cardTheme = darkMode
    ? "bg-zinc-900/90 border-zinc-700"
    : "bg-white/90 border-white shadow-2xl";

  const inputTheme = darkMode
    ? "bg-zinc-800 text-white placeholder:text-gray-400"
    : "bg-gray-100 text-black placeholder:text-gray-500";

  const smallText = darkMode ? "text-gray-300" : "text-slate-600";

  return (
    <main className={`min-h-screen overflow-hidden transition ${pageTheme}`}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.section
            key="splash"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white px-6"
          >
            <motion.div
              initial={{ scale: 0.25, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 170, damping: 13 }}
              className="relative bg-white text-green-600 w-28 h-28 rounded-[2rem] shadow-2xl flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] rounded-[2.4rem] border-4 border-white/30 border-t-white"
              />
              <CircleDollarSign className="w-16 h-16" />
            </motion.div>

            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-6xl sm:text-7xl font-black mt-8 tracking-tight"
            >
              Fetch
            </motion.h1>

            <motion.p
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4 font-bold text-white/90 text-center"
            >
              Sri Lanka’s smart price comparison app
            </motion.p>
          </motion.section>
        ) : (
          <section className="min-h-screen relative flex items-center justify-center px-5 py-8 sm:px-8">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-32 -left-32 w-80 h-80 bg-green-400/30 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-0 -right-32 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl"
            />

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute top-6 right-6 p-3 rounded-2xl border z-20 ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-yellow-400"
                  : "bg-white border-gray-200 text-black shadow-lg"
              }`}
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </motion.button>

            <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:block"
              >
                <div className="inline-flex items-center gap-3 bg-white/80 text-green-700 px-5 py-3 rounded-full shadow-lg font-black">
                  <MapPin size={20} />
                  Built for Sri Lankan prices
                </div>

                <h1 className="text-6xl xl:text-7xl font-black leading-tight mt-8">
                  Compare prices.
                  <br />
                  <span className="text-green-600">Save before you pay.</span>
                </h1>

                <p className={`mt-6 text-lg font-semibold max-w-xl ${smallText}`}>
                  Fetch helps you compare food, ride, grocery and product prices
                  in one smart, fast and clean experience.
                </p>

                <div className="grid grid-cols-3 gap-4 mt-10">
                  {[
                    [TrendingDown, "Cheaper deals"],
                    [Zap, "Fast results"],
                    [WalletCards, "Better choices"],
                  ].map(([Icon, text]: any) => (
                    <motion.div
                      key={text}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className={`rounded-3xl p-5 shadow-xl ${
                        darkMode ? "bg-zinc-900" : "bg-white"
                      }`}
                    >
                      <Icon className="text-green-500" size={30} />
                      <p className="font-black mt-4">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md mx-auto"
              >
                <div className="text-center mb-7">
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    className="mx-auto w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.35, 0.15, 0.35],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-green-400 rounded-[2rem] blur-2xl"
                    />

                    <motion.div
                      animate={{ x: ["-100%", "140%"] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="absolute top-0 bottom-0 w-10 bg-white/30 rotate-12"
                    />

                    <CircleDollarSign className="text-white w-14 h-14 relative z-10" />
                  </motion.div>

                  <h1 className="text-6xl font-black mt-5 tracking-tight">
                    Fetch
                  </h1>

                  <p className={`mt-3 font-bold ${smallText}`}>
                    Find the best price before you pay.
                  </p>
                </div>

                <motion.div
                  layout
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                    boxShadow: "0px 20px 45px rgba(0,0,0,0.12)",
                  }}
                  className={`rounded-[2rem] p-6 sm:p-7 border backdrop-blur-xl ${cardTheme}`}
                >
                  <div
                    className={`flex rounded-2xl p-1 mb-7 ${
                      darkMode ? "bg-zinc-800" : "bg-gray-100"
                    }`}
                  >
                    <button
                      onClick={() => setAuthMode("login")}
                      className={`flex-1 py-4 rounded-xl font-black transition ${
                        authMode === "login"
                          ? "bg-green-500 text-white shadow-lg"
                          : smallText
                      }`}
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setAuthMode("signup")}
                      className={`flex-1 py-4 rounded-xl font-black transition ${
                        authMode === "signup"
                          ? "bg-green-500 text-white shadow-lg"
                          : smallText
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={authMode}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.25 }}
                    >
                      {authMode === "signup" && (
                        <>
                          <div className="mb-5">
                            <label className={`text-sm font-black ${smallText}`}>
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
                            <label className={`text-sm font-black ${smallText}`}>
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
                        <label className={`text-sm font-black ${smallText}`}>
                          WhatsApp Number
                        </label>

                        <div
                          className={`flex items-center gap-3 rounded-2xl px-4 py-4 mt-2 ${inputTheme}`}
                        >
                          <Phone className="text-gray-400 w-5 h-5" />
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+94771234567"
                            className="bg-transparent outline-none w-full"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className={`text-sm font-black ${smallText}`}>
                          OTP Code
                        </label>

                        <div
                          className={`flex items-center gap-3 rounded-2xl px-4 py-4 mt-2 ${inputTheme}`}
                        >
                          <ShieldCheck className="text-gray-400 w-5 h-5" />
                          <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="bg-transparent outline-none w-full"
                          />
                        </div>

                        <div className="flex gap-3 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={sendOTP}
                            className="flex-1 bg-green-100 text-green-700 py-3 rounded-2xl font-black hover:bg-green-200 transition flex items-center justify-center gap-2"
                          >
                            {sendingOtp ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              "Send OTP"
                            )}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={confirmOTP}
                            className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-black hover:bg-green-600 transition shadow-lg flex items-center justify-center gap-2"
                          >
                            {verifyingOtp ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              "Confirm"
                            )}
                          </motion.button>
                        </div>
                      </div>

                      <Link href="/dashboard">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-2"
                        >
                          {authMode === "login" ? "Continue" : "Create Account"}
                          <ArrowRight size={22} />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </AnimatePresence>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div
                      className={`rounded-2xl p-4 ${
                        darkMode ? "bg-zinc-800" : "bg-green-50"
                      }`}
                    >
                      <Sparkles className="text-green-500 mb-2" size={20} />
                      <p className="text-xs font-black">Smart savings</p>
                    </div>

                    <div
                      className={`rounded-2xl p-4 ${
                        darkMode ? "bg-zinc-800" : "bg-green-50"
                      }`}
                    >
                      <BadgeCheck className="text-green-500 mb-2" size={20} />
                      <p className="text-xs font-black">WhatsApp OTP</p>
                    </div>
                  </div>
                </motion.div>

                <p className={`text-center mt-6 text-sm font-semibold ${smallText}`}>
                  {authMode === "login"
                    ? "New here? Tap Sign Up to create an account."
                    : "Already have an account? Tap Login."}
                </p>
              </motion.div>
            </div>

            <footer
              className={`absolute bottom-4 left-0 right-0 text-center text-xs font-bold ${smallText}`}
            >
              © 2026 Team Times. All rights reserved.
            </footer>
          </section>
        )}
      </AnimatePresence>
    </main>
  );
}