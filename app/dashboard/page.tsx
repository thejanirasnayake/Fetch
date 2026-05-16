"use client";

import {
  Bell,
  Home,
  Clock,
  Heart,
  User,
  Search,
  ShoppingBag,
  Bike,
  Utensils,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-28">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-500 px-6 pt-10 pb-24 rounded-b-[42px] text-white relative">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold opacity-90">Welcome 👋</p>
            <h1 className="text-3xl font-black mt-1">Janira</h1>
          </div>

          <button className="bg-white/20 p-3 rounded-2xl">
            <Bell size={22} />
          </button>
        </div>

        <div className="mt-7 bg-white/15 rounded-3xl p-4 flex items-center gap-3">
          <Search size={20} />
          <input
            placeholder="Search KFC, Pizza Hut, Uber..."
            className="bg-transparent outline-none placeholder:text-white/80 text-white w-full"
          />
        </div>

        {/* Saving Card */}
        <div className="absolute left-6 right-6 -bottom-16 bg-white text-black rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="bg-green-100 text-green-600 p-5 rounded-3xl">
              <Sparkles size={34} />
            </div>

            <div className="flex-1">
              <p className="text-gray-500 font-bold text-sm">This week you saved</p>
              <h2 className="text-4xl font-black text-green-600">LKR 330</h2>
              <p className="text-sm font-bold">Best deal: PickMe Food</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 mt-24">
        <h2 className="text-2xl font-black mb-5">Choose a Mode</h2>

        <div className="grid grid-cols-2 gap-5">
          <button className="bg-white rounded-3xl p-6 text-left shadow-lg border border-gray-100">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 mb-5">
              <Utensils size={34} />
            </div>
            <h3 className="font-black text-xl">Food Delivery</h3>
            <p className="text-gray-500 text-sm font-semibold mt-1">
              Compare PickMe & Uber Eats
            </p>
          </button>

          <button className="bg-white rounded-3xl p-6 text-left shadow-lg border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-5">
              <Bike size={34} />
            </div>
            <h3 className="font-black text-xl">Ride</h3>
            <p className="text-gray-500 text-sm font-semibold mt-1">
              Compare ride prices fast
            </p>
          </button>

          <button className="bg-white rounded-3xl p-6 text-left shadow-lg border border-gray-100 col-span-2">
            <div className="flex items-center gap-5">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center text-yellow-600">
                <ShoppingBag size={34} />
              </div>

              <div>
                <h3 className="font-black text-xl">Grocery & Products</h3>
                <p className="text-gray-500 text-sm font-semibold mt-1">
                  Compare prices before you buy
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="flex justify-between items-center mt-10 mb-5">
          <h2 className="text-2xl font-black">Recent Searches</h2>
          <button className="text-green-600 font-black">View All</button>
        </div>

        <div className="space-y-4">
          {[
            { icon: "🍗", title: "KFC Bucket Meal", save: "Saved LKR 250" },
            { icon: "🍕", title: "Pizza Hut Combo", save: "Saved LKR 180" },
            { icon: "🚗", title: "Colombo to Nugegoda", save: "Saved LKR 120" },
          ].map((item) => (
            <button
              key={item.title}
              className="w-full bg-white rounded-3xl p-5 shadow-md flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl">
                  {item.icon}
                </div>

                <div className="text-left">
                  <h3 className="font-black">{item.title}</h3>
                  <p className="text-sm text-green-600 font-bold">{item.save}</p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-5 left-5 right-5 bg-white rounded-3xl shadow-2xl px-6 py-4 flex justify-around border border-gray-100">
        <button className="flex flex-col items-center text-green-600 font-black text-xs">
          <Home size={24} />
          Home
        </button>

        <button className="flex flex-col items-center text-gray-400 font-black text-xs">
          <Clock size={24} />
          History
        </button>

        <button className="flex flex-col items-center text-gray-400 font-black text-xs">
          <Heart size={24} />
          Saved
        </button>

        <button className="flex flex-col items-center text-gray-400 font-black text-xs">
          <User size={24} />
          Profile
        </button>
      </nav>
    </main>
  );
}