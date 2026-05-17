"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  Home,
  Clock,
  Heart,
  User,
  Sparkles,
  TrendingDown,
  ChevronRight,
  Search,
} from "lucide-react";

const tabs = ["All", "Food", "Ride", "Grocery"];

const historyItems = [
  {
    emoji: "🍗",
    name: "KFC",
    type: "Food Delivery",
    amount: "LKR 850",
    date: "May 20, 2025",
    category: "Food",
    saved: "Saved LKR 250",
    search: "KFC",
  },
  {
    emoji: "🍕",
    name: "Pizza Hut",
    type: "Food Delivery",
    amount: "LKR 920",
    date: "May 20, 2025",
    category: "Food",
    saved: "Saved LKR 180",
    search: "Pizza Hut",
  },
  {
    emoji: "🚗",
    name: "Colombo Fort to Nugegoda",
    type: "Ride",
    amount: "LKR 1,250",
    date: "May 19, 2025",
    category: "Ride",
    saved: "Saved LKR 120",
    from: "Colombo Fort",
    to: "Nugegoda",
  },
  {
    emoji: "🥛",
    name: "Milk 1L",
    type: "Grocery",
    amount: "LKR 185",
    date: "May 10, 2025",
    category: "Grocery",
    saved: "Saved LKR 45",
    search: "Milk 1L",
  },
  {
    emoji: "🍔",
    name: "Burger King",
    type: "Food Delivery",
    amount: "LKR 760",
    date: "May 8, 2025",
    category: "Food",
    saved: "Saved LKR 210",
    search: "Burger King",
  },
  {
    emoji: "🚖",
    name: "Nugegoda to Dehiwala",
    type: "Ride",
    amount: "LKR 680",
    date: "May 5, 2025",
    category: "Ride",
    saved: "Saved LKR 90",
    from: "Nugegoda",
    to: "Dehiwala",
  },
];

function buildDashboardUrl(item: any) {
  if (item.category === "Ride") {
    return `/dashboard?category=Ride&from=${encodeURIComponent(
      item.from
    )}&to=${encodeURIComponent(item.to)}`;
  }

  return `/dashboard?category=${item.category}&search=${encodeURIComponent(
    item.search || item.name
  )}`;
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? historyItems
      : historyItems.filter((i) => i.category === activeTab);

  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-32 overflow-hidden">
      <section className="relative bg-gradient-to-br from-green-600 to-emerald-500 px-6 md:px-10 pt-10 pb-14 rounded-b-[42px] text-white overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full font-black text-sm mb-5">
            <Clock size={16} />
            Search Activity
          </div>

          <h1 className="text-4xl md:text-5xl font-black">
            Your Search History
          </h1>

          <p className="text-white/85 font-semibold mt-3 max-w-lg">
            Tap any past search to run it again instantly.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-5"
            >
              <Search className="mb-3" />
              <p className="text-3xl font-black">24</p>
              <p className="text-sm font-bold text-white/80">
                Total Searches
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-5"
            >
              <TrendingDown className="mb-3" />
              <p className="text-3xl font-black">LKR 895</p>
              <p className="text-sm font-bold text-white/80">Total Saved</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-5 hidden md:block"
            >
              <Sparkles className="mb-3" />
              <p className="text-3xl font-black">Food</p>
              <p className="text-sm font-bold text-white/80">Top Category</p>
            </motion.div>
          </div>

          <div className="flex gap-3 mt-8 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-2xl font-black text-sm flex-shrink-0 transition ${
                  activeTab === tab
                    ? "bg-white text-green-600 shadow-xl"
                    : "bg-white/20 text-white"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 mt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">
              Smart Search Timeline
            </h2>

            <p className="text-gray-500 font-bold mt-1">
              Click a card to compare that deal again.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-black text-sm">
            <Sparkles size={16} />
            Replay enabled
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="space-y-5"
          >
            {filtered.map((item, i) => (
              <Link key={i} href={buildDashboardUrl(item)}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                    boxShadow: "0px 20px 45px rgba(0,0,0,0.08)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-[2rem] p-5 md:p-6 shadow-md border border-gray-100 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.06 }}
                        className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      >
                        {item.emoji}
                      </motion.div>

                      <div>
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black mb-2">
                          <Sparkles size={14} />
                          {item.category}
                        </div>

                        <h3 className="font-black text-xl">{item.name}</h3>

                        <p className="text-sm text-gray-500 font-semibold">
                          {item.type}
                        </p>

                        <p className="text-xs text-gray-400 font-semibold mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5">
                      <div className="text-right">
                        <p className="font-black text-2xl">{item.amount}</p>

                        <p className="text-sm text-green-600 font-black mt-1">
                          {item.saved}
                        </p>

                        <p className="text-xs text-gray-400 font-black mt-1">
                          Tap to search again
                        </p>
                      </div>

                      <motion.div whileHover={{ x: 3 }}>
                        <ChevronRight className="text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <footer className="text-center text-xs font-bold text-gray-400 mt-12 mb-28">
        © 2026 Team Times. All rights reserved.
      </footer>

      <nav className="fixed bottom-5 left-5 right-5 bg-white rounded-3xl shadow-2xl px-6 py-4 flex justify-around border border-gray-100 z-50">
        <Link
          href="/dashboard"
          className="flex flex-col items-center text-gray-400 font-black text-xs"
        >
          <Home size={24} />
          Home
        </Link>

        <Link
          href="/history"
          className="flex flex-col items-center text-green-600 font-black text-xs"
        >
          <Clock size={24} />
          History
        </Link>

        <Link
          href="/saved"
          className="flex flex-col items-center text-gray-400 font-black text-xs"
        >
          <Heart size={24} />
          Saved
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center text-gray-400 font-black text-xs"
        >
          <User size={24} />
          Profile
        </Link>
      </nav>
    </main>
  );
}