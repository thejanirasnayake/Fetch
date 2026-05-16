"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Clock, Heart, User } from "lucide-react";

const tabs = ["All", "Food", "Ride", "Grocery"];

const historyItems = [
  { emoji: "🍗", name: "KFC", type: "Food Delivery", amount: "LKR 850", date: "May 20, 2025", category: "Food" },
  { emoji: "🍕", name: "Pizza Hut", type: "Food Delivery", amount: "LKR 920", date: "May 20, 2025", category: "Food" },
  { emoji: "🚗", name: "Colombo Fort to Nugegoda", type: "Ride", amount: "LKR 1,250", date: "May 19, 2025", category: "Ride" },
  { emoji: "🥛", name: "Milk 1L", type: "Grocery", amount: "LKR 185", date: "May 10, 2025", category: "Grocery" },
  { emoji: "🍔", name: "Burger King", type: "Food Delivery", amount: "LKR 760", date: "May 8, 2025", category: "Food" },
  { emoji: "🚖", name: "Nugegoda to Dehiwala", type: "Ride", amount: "LKR 680", date: "May 5, 2025", category: "Ride" },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All" ? historyItems : historyItems.filter((i) => i.category === activeTab);

  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-28">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-500 px-6 pt-10 pb-8 rounded-b-[42px] text-white">
        <h1 className="text-3xl font-black">History</h1>
        <p className="text-sm font-semibold opacity-90 mt-1">Your past searches</p>

        {/* Tabs */}
        <div className="flex gap-3 mt-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-2xl font-black text-sm flex-shrink-0 transition ${
                activeTab === tab
                  ? "bg-white text-green-600"
                  : "bg-white/20 text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* List */}
      <section className="px-6 mt-6 space-y-4">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 shadow-md flex items-center gap-4"
          >
            <div className="bg-gray-100 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-black">{item.name}</h3>
              <p className="text-sm text-gray-500 font-semibold">{item.type}</p>
              <p className="text-xs text-gray-400 font-semibold mt-1">{item.date}</p>
            </div>
            <p className="font-black text-black flex-shrink-0">{item.amount}</p>
          </div>
        ))}
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-5 left-5 right-5 bg-white rounded-3xl shadow-2xl px-6 py-4 flex justify-around border border-gray-100">
        <Link href="/dashboard" className="flex flex-col items-center text-gray-400 font-black text-xs">
          <Home size={24} />
          Home
        </Link>
        <Link href="/history" className="flex flex-col items-center text-green-600 font-black text-xs">
          <Clock size={24} />
          History
        </Link>
        <Link href="/saved" className="flex flex-col items-center text-gray-400 font-black text-xs">
          <Heart size={24} />
          Saved
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-400 font-black text-xs">
          <User size={24} />
          Profile
        </Link>
      </nav>
    </main>
  );
}
