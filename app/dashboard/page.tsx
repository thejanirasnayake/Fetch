"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  MapPin,
  Navigation,
  Sparkles,
  Trophy,
  Loader2,
} from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState("");
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [category, setCategory] = useState("");
  const [backendData, setBackendData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(
    customCategory?: string,
    customSearch?: string,
    customFrom?: string,
    customTo?: string
  ) {
    const finalCategory = customCategory || category;
    const finalSearch = customSearch || searchText;
    const finalFrom = customFrom || fromText;
    const finalTo = customTo || toText;

    if (!finalCategory) {
      alert("Please select Food, Ride, or Grocery first");
      return;
    }

    if (finalCategory === "Ride" && (!finalFrom.trim() || !finalTo.trim())) {
      alert("Please enter From and To locations");
      return;
    }

    if (finalCategory !== "Ride" && !finalSearch.trim()) {
      alert("Please type something to search");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://thejaniras.app.n8n.cloud/webhook/fetch-compare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "compare",
            category: finalCategory,
            search:
              finalCategory === "Ride"
                ? `${finalFrom} ${finalTo}`
                : finalSearch,
            from: finalFrom,
            to: finalTo,
          }),
        }
      );

      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.error("Backend error:", error);
      setBackendData({
        success: false,
        message: "Could not connect to backend.",
        results: [],
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    if (!categoryParam) return;

    setCategory(categoryParam);

    if (categoryParam === "Ride") {
      setFromText(fromParam || "");
      setToText(toParam || "");

      if (fromParam && toParam) {
        handleSearch(categoryParam, "", fromParam, toParam);
      }
    } else {
      setSearchText(searchParam || "");

      if (searchParam) {
        handleSearch(categoryParam, searchParam, "", "");
      }
    }
  }, []);

  const best = backendData?.cheapestOption;

  const modeCards = [
    {
      key: "Food",
      title: "Food Delivery",
      subtitle: "Compare PickMe & Uber Eats",
      icon: Utensils,
      active: "border-green-500 bg-green-50",
      iconBox: "bg-green-100 text-green-600",
    },
    {
      key: "Ride",
      title: "Ride",
      subtitle: "Compare ride prices fast",
      icon: Bike,
      active: "border-blue-500 bg-blue-50",
      iconBox: "bg-blue-100 text-blue-600",
    },
    {
      key: "Grocery",
      title: "Grocery & Products",
      subtitle: "Compare prices before you buy",
      icon: ShoppingBag,
      active: "border-yellow-500 bg-yellow-50",
      iconBox: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-32 overflow-hidden">
      <section className="bg-gradient-to-br from-green-600 to-emerald-500 px-6 md:px-10 pt-10 pb-20 rounded-b-[42px] text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold opacity-90">Welcome 👋</p>
            <h1 className="text-4xl md:text-5xl font-black mt-1">Janira</h1>
            <p className="text-white/80 font-semibold mt-2">
              Choose a mode and find your best deal.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            className="bg-white/20 p-3 rounded-2xl"
          >
            <Bell size={22} />
          </motion.button>
        </div>
      </section>

      <section className="px-6 md:px-10 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 border border-white"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black">
                Choose a Mode
              </h2>
              <p className="text-gray-500 font-bold mt-1">
                Select what you want to compare first.
              </p>
            </div>

            {category && (
              <div className="hidden sm:flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-black text-sm">
                <Sparkles size={16} />
                {category} selected
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modeCards.map((mode, index) => {
              const Icon = mode.icon;
              const isActive = category === mode.key;

              return (
                <motion.button
                  key={mode.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCategory(mode.key);
                    setBackendData(null);
                  }}
                  className={`rounded-3xl p-6 text-left shadow-lg border-2 transition ${
                    isActive ? mode.active : "bg-white border-gray-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${mode.iconBox}`}
                  >
                    <Icon size={34} />
                  </div>

                  <h3 className="font-black text-xl">{mode.title}</h3>
                  <p className="text-gray-500 text-sm font-semibold mt-1">
                    {mode.subtitle}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-black text-green-600"
                    >
                      <Sparkles size={16} />
                      Ready to search
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {category && (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              className="mt-8 bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100"
            >
              <p className="text-center text-gray-500 font-bold mb-5">
                {category === "Ride"
                  ? "Enter your route and compare the best ride price"
                  : `Search ${category} deals instantly`}
              </p>

              {category === "Ride" ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-3xl p-4 flex items-center gap-3 border border-gray-200">
                    <MapPin size={20} className="text-blue-600" />
                    <input
                      value={fromText}
                      onChange={(e) => setFromText(e.target.value)}
                      placeholder="From: Colombo Fort"
                      className="bg-transparent outline-none text-black placeholder:text-gray-500 w-full"
                    />
                  </div>

                  <div className="bg-gray-100 rounded-3xl p-4 flex items-center gap-3 border border-gray-200">
                    <Navigation size={20} className="text-green-600" />
                    <input
                      value={toText}
                      onChange={(e) => setToText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      placeholder="To: Nugegoda"
                      className="bg-transparent outline-none text-black placeholder:text-gray-500 w-full"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSearch()}
                    className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Comparing...
                      </>
                    ) : (
                      "Compare Ride"
                    )}
                  </motion.button>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-3xl p-4 flex items-center gap-3 border border-gray-200">
                  <Search size={20} className="text-gray-500" />

                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    placeholder={
                      category === "Grocery"
                        ? "Search milk, rice, sugar..."
                        : "Search KFC, Pizza Hut, biriyani..."
                    }
                    className="bg-transparent outline-none text-black placeholder:text-gray-500 w-full"
                  />

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSearch()}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      "Search"
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            Find your cheapest option
          </h2>
          <p className="text-gray-500 font-bold mb-6">
            Smart comparisons from live backend data.
          </p>

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl p-6 shadow-md animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded-full w-1/3 mb-4" />
                  <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-3" />
                  <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!loading && backendData && (
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-600 to-emerald-500 text-white rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />

                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full font-black text-sm mb-5">
                  <Trophy size={18} />
                  CHEAPEST DEAL
                </div>

                <h3 className="text-3xl md:text-4xl font-black">
                  {best?.Search ||
                    `${best?.From || ""} → ${best?.To || ""}` ||
                    "No result"}
                </h3>

                <p className="font-bold mt-3 text-white/90">
                  {backendData.message}
                </p>

                <p className="mt-4 font-black">
                  Total matches: {backendData.totalResults || 0}
                </p>
              </motion.div>

              {backendData.results?.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -4, scale: 1.005 }}
                  className="w-full bg-white rounded-[2rem] p-6 shadow-md border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-5">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black mb-3">
                        <Sparkles size={14} />
                        Best Option: {item["Best Option"]}
                      </div>

                      <h3 className="font-black text-xl">
                        {item.Search || `${item.From} → ${item.To}`}
                      </h3>

                      <p className="text-sm text-gray-500 font-bold mt-1">
                        {item.Store || `${item.From} → ${item.To}`} •{" "}
                        {item.Location || item.To}
                      </p>

                      <p className="text-sm text-green-600 font-bold mt-2">
                        Saved LKR {item.Saving}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:text-right">
                      <div className="bg-green-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500 font-black">
                          PickMe
                        </p>
                        <p className="font-black text-green-600">
                          LKR {item["PickMe Price"]}
                        </p>
                        <p className="text-xs text-gray-500 font-bold">
                          {item["PickMe Time"]}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500 font-black">
                          Uber
                        </p>
                        <p className="font-black text-gray-700">
                          LKR {item["Uber Price"]}
                        </p>
                        <p className="text-xs text-gray-500 font-bold">
                          {item["Uber Time"]}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {!backendData && (
          <>
            <div className="flex justify-between items-center mt-10 mb-5">
              <h2 className="text-2xl font-black">Recent Searches</h2>
              <button className="text-green-600 font-black">View All</button>
            </div>

            <div className="space-y-4">
              {[
                { icon: "🍗", title: "KFC Bucket Meal", save: "Saved LKR 250" },
                { icon: "🍕", title: "Pizza Hut Combo", save: "Saved LKR 180" },
                {
                  icon: "🚗",
                  title: "Colombo to Nugegoda",
                  save: "Saved LKR 120",
                },
              ].map((item) => (
                <motion.button
                  whileHover={{ y: -3 }}
                  key={item.title}
                  className="w-full bg-white rounded-3xl p-5 shadow-md flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl">
                      {item.icon}
                    </div>

                    <div className="text-left">
                      <h3 className="font-black">{item.title}</h3>
                      <p className="text-sm text-green-600 font-bold">
                        {item.save}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="text-gray-400" />
                </motion.button>
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="text-center text-xs font-bold text-gray-400 mt-12 mb-28">
        © 2026 Team Times. All rights reserved.
      </footer>

      <nav className="fixed bottom-5 left-5 right-5 bg-white rounded-3xl shadow-2xl px-6 py-4 flex justify-around border border-gray-100 z-50">
        <Link
          href="/dashboard"
          className="flex flex-col items-center text-green-600 font-black text-xs"
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
export default function Dashboard() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F5F7F5]" />}>
      <DashboardContent />
    </Suspense>
  );
}