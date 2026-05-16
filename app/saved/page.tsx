"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Clock, Heart, User } from "lucide-react";

const initialItems = [
  { emoji: "🍗", name: "KFC", type: "Food Delivery" },
  { emoji: "🍕", name: "Pizza Hut", type: "Food Delivery" },
  { emoji: "🍔", name: "Burger King", type: "Food Delivery" },
  { emoji: "🥛", name: "Milk 1L", type: "Grocery" },
];

export default function SavedPage() {
  const [items, setItems] = useState(initialItems.map((i) => ({ ...i, saved: true })));

  const toggle = (idx: number) => {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, saved: !item.saved } : item)));
  };

  const visible = items.filter((i) => i.saved);

  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-28">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-500 px-6 pt-10 pb-8 rounded-b-[42px] text-white">
        <h1 className="text-3xl font-black">Saved</h1>
        <p className="text-sm font-semibold opacity-90 mt-1">Your favourite items</p>
      </section>

      {/* List */}
      <section className="px-6 mt-6 space-y-4">
        {visible.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl">💔</p>
            <p className="font-black mt-4">No saved items yet</p>
          </div>
        )}
        {visible.map((item, i) => {
          const realIdx = items.findIndex((s) => s.name === item.name && s.saved);
          return (
            <div key={i} className="bg-white rounded-3xl p-5 shadow-md flex items-center gap-4">
              <div className="bg-gray-100 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-black">{item.name}</h3>
                <p className="text-sm text-gray-500 font-semibold">{item.type}</p>
              </div>
              <button onClick={() => toggle(realIdx)} className="p-2">
                <Heart size={24} fill="#16a34a" className="text-green-600" />
              </button>
            </div>
          );
        })}
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-5 left-5 right-5 bg-white rounded-3xl shadow-2xl px-6 py-4 flex justify-around border border-gray-100">
        <Link href="/dashboard" className="flex flex-col items-center text-gray-400 font-black text-xs">
          <Home size={24} />
          Home
        </Link>
        <Link href="/history" className="flex flex-col items-center text-gray-400 font-black text-xs">
          <Clock size={24} />
          History
        </Link>
        <Link href="/saved" className="flex flex-col items-center text-green-600 font-black text-xs">
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
