"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  Home,
  Clock,
  Heart,
  User,
  ChevronRight,
  ChevronDown,
  LogOut,
  CreditCard,
  MapPin,
  Bell,
  Settings,
  HelpCircle,
  Info,
  Pencil,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Mail,
  Phone,
  BadgeCheck,
  Save,
  CheckCircle2,
} from "lucide-react";

const menuItems = [
  {
    icon: User,
    label: "Personal Information",
    content: "Name: Janira\nEmail: janira@example.com\nPhone: +94 71 234 5678",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    content: "No payment method added yet. You can add a card or wallet later.",
  },
  {
    icon: MapPin,
    label: "Addresses",
    content:
      "Saved address: Colombo, Sri Lanka.\nHome and work addresses can be added here.",
  },
  {
    icon: Bell,
    label: "Notifications",
    content:
      "Notifications are enabled for price alerts, saved deals, and order updates.",
  },
  {
    icon: Settings,
    label: "Settings",
    content: "Manage app preferences, language, privacy, and appearance settings.",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    content:
      "Need help? Contact Fetch support for account, payment, or comparison issues.",
  },
  {
    icon: Info,
    label: "About Fetch",
    content:
      "Fetch helps users compare prices between PickMe, Uber, food delivery, rides, and grocery services. It helps you find the best deal, save money, and choose faster options.",
  },
];

export default function ProfilePage() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-32 overflow-hidden">
      <section className="relative bg-gradient-to-br from-green-600 to-emerald-500 px-6 md:px-10 pt-8 pb-14 rounded-b-[30px] text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full font-black text-sm mb-7">
            <ShieldCheck size={16} />
            Verified Fetch Account
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <motion.div
              whileHover={{ rotate: 3, scale: 1.03 }}
              className="relative w-24 h-24 rounded-[2rem] bg-white/20 border-2 border-white/60 flex items-center justify-center text-5xl shadow-xl"
            >
              👩
              <div className="absolute -bottom-2 -right-2 bg-white text-green-600 rounded-full p-2 shadow-lg">
                <BadgeCheck size={20} />
              </div>
            </motion.div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black">Janira</h1>

              <div className="mt-3 space-y-1">
                <p className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <Mail size={15} />
                  janira@example.com
                </p>

                <p className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <Phone size={15} />
                  +94 71 234 5678
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              onClick={() => setEditing(!editing)}
              className="bg-white text-green-700 px-5 py-3 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl w-fit"
            >
              <Pencil size={18} />
              {editing ? "Close" : "Edit"}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: Sparkles,
                value: "24",
                label: "Searches",
              },
              {
                icon: Heart,
                value: "12",
                label: "Saved Deals",
              },
              {
                icon: WalletCards,
                value: "LKR 895",
                label: "Total Saved",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white/15 backdrop-blur-lg rounded-[1.5rem] p-5 min-h-[120px] flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Icon size={24} />
                  </div>

                  <div>
                    <p className="text-3xl font-black">{stat.value}</p>
                    <p className="text-sm font-bold text-white/80">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 mt-8 relative z-20">
        <AnimatePresence>
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white mb-8"
            >
              <div className="flex items-center gap-2 mb-5">
                <Pencil className="text-green-600" size={20} />
                <h2 className="text-2xl font-black">Edit Profile</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  placeholder="Janira"
                  className="w-full bg-gray-100 text-black rounded-2xl px-4 py-4 outline-none font-semibold border border-gray-200"
                />
                <input
                  placeholder="janira@example.com"
                  className="w-full bg-gray-100 text-black rounded-2xl px-4 py-4 outline-none font-semibold border border-gray-200"
                />
                <input
                  placeholder="+94 71 234 5678"
                  className="w-full bg-gray-100 text-black rounded-2xl px-4 py-4 outline-none font-semibold border border-gray-200"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setEditing(false)}
                className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 font-black flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">
              Account Control Center
            </h2>

            <p className="text-gray-500 font-bold mt-1">
              Manage your profile, preferences and Fetch settings.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-black text-sm shadow-md border border-gray-100">
            <CheckCircle2 size={16} />
            Everything is up to date
          </div>
        </div>

        <div className="space-y-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openItem === item.label;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  whileHover={{ y: -3, scale: 1.003 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                  className={`w-full rounded-[1.75rem] p-5 md:p-6 shadow-md flex items-center gap-4 border transition ${
                    isOpen
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isOpen
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="font-black">{item.label}</h3>
                    <p className="text-sm text-gray-500 font-semibold mt-1">
                      Tap to view details
                    </p>
                  </div>

                  {isOpen ? (
                    <ChevronDown size={20} className="text-green-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-green-100 rounded-[1.75rem] p-6 shadow-sm mt-3">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black mb-3">
                          <Sparkles size={14} />
                          {item.label}
                        </div>

                        <p className="text-sm text-gray-700 font-semibold leading-6 whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <Link href="/">
            <motion.button
              whileHover={{ y: -3, scale: 1.003 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-500 hover:bg-red-600 rounded-[1.75rem] p-5 shadow-md flex items-center justify-center gap-3 mt-4"
            >
              <LogOut size={20} className="text-white" />
              <span className="font-black text-white">Log Out</span>
            </motion.button>
          </Link>
        </div>
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
          className="flex flex-col items-center text-gray-400 font-black text-xs"
        >
          <Heart size={24} />
          Saved
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center text-green-600 font-black text-xs"
        >
          <User size={24} />
          Profile
        </Link>
      </nav>
    </main>
  );
}