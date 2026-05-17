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
  Trash2,
  Search,
  ChevronRight,
  TrendingDown,
  BookmarkCheck,
} from "lucide-react";

const initialItems = [
  {
    emoji: "🍗",
    name: "KFC Bucket Meal",
    type: "Food Delivery",
    category: "Food",
    price: "LKR 850",
    saved: "Saved LKR 250",
  },
  {
    emoji: "🍕",
    name: "Pizza Hut Combo",
    type: "Food Delivery",
    category: "Food",
    price: "LKR 920",
    saved: "Saved LKR 180",
  },
  {
    emoji: "🍔",
    name: "Burger King",
    type: "Food Delivery",
    category: "Food",
    price: "LKR 760",
    saved: "Saved LKR 210",
  },
  {
    emoji: "🥛",
    name: "Milk 1L",
    type: "Grocery",
    category: "Grocery",
    price: "LKR 185",
    saved: "Saved LKR 45",
  },
];

export default function SavedPage() {
  const [items, setItems] = useState(
    initialItems.map((item) => ({ ...item, isSaved: true }))
  );

  const [searchText, setSearchText] = useState("");

  const toggle = (idx: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const visible = items.filter(
    (item) =>
      item.isSaved &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalSaved = visible.reduce((total, item) => {
    const match = item.saved.match(/\d+/);
    return total + (match ? Number(match[0]) : 0);
  }, 0);

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
            <BookmarkCheck size={16} />
            Saved Deals
          </div>

          <h1 className="text-4xl md:text-5xl font-black">
            Your Best Picks
          </h1>

          <p className="text-white/85 font-semibold mt-3 max-w-lg">
            Keep your favourite deals close and return to them whenever you want.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-5"
            >
              <Heart className="mb-3" />
              <p className="text-3xl font-black">{visible.length}</p>
              <p className="text-sm font-bold text-white/80">Saved Items</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-5"
            >
              <TrendingDown className="mb-3" />
              <p className="text-3xl font-black">LKR {totalSaved}</p>
              <p className="text-sm font-bold text-white/80">Potential Save</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-5 hidden md:block"
            >
              <Sparkles className="mb-3" />
              <p className="text-3xl font-black">Smart</p>
              <p className="text-sm font-bold text-white/80">Quick Access</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-5 shadow-xl border border-gray-100"
        >
          <div className="flex items-center gap-3 bg-gray-100 rounded-3xl px-4 py-4">
            <Search size={20} className="text-gray-500" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search your saved deals..."
              className="bg-transparent outline-none w-full text-black placeholder:text-gray-500 font-semibold"
            />
          </div>
        </motion.div>

        <div className="flex justify-between items-center mt-10 mb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">
              Saved Collection
            </h2>
            <p className="text-gray-500 font-bold mt-1">
              Deals you marked for later.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-black text-sm">
            <Sparkles size={16} />
            Tap heart to remove
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-[2rem] shadow-md border border-gray-100"
            >
              <p className="text-6xl">💔</p>
              <p className="font-black text-2xl mt-4">No saved items yet</p>
              <p className="text-gray-500 font-bold mt-2">
                Save deals from your search results and they will appear here.
              </p>
            </motion.div>
          )}

          <div className="space-y-5">
            {visible.map((item) => {
              const realIdx = items.findIndex((savedItem) => savedItem.name === item.name);

              return (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: 30 }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                    boxShadow: "0px 20px 45px rgba(0,0,0,0.08)",
                  }}
                  className="bg-white rounded-[2rem] p-5 md:p-6 shadow-md border border-gray-100"
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

                        <p className="text-sm text-green-600 font-black mt-2">
                          {item.saved}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-black">
                          Best Price
                        </p>
                        <p className="font-black text-2xl">{item.price}</p>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.08 }}
                        onClick={() => toggle(realIdx)}
                        className="bg-green-100 text-green-600 p-3 rounded-2xl"
                      >
                        <Heart size={24} fill="#16a34a" />
                      </motion.button>

                      <motion.div whileHover={{ x: 3 }}>
                        <ChevronRight className="text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
          className="flex flex-col items-center text-gray-400 font-black text-xs"
        >
          <Clock size={24} />
          History
        </Link>

        <Link
          href="/saved"
          className="flex flex-col items-center text-green-600 font-black text-xs"
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