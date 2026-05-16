"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

const menuItems = [
  {
    icon: <User size={20} />,
    label: "Personal Information",
    content: "Name: Janira\nEmail: janira@example.com\nPhone: +94 71 234 5678",
  },
  {
    icon: <CreditCard size={20} />,
    label: "Payment Methods",
    content: "No payment method added yet. You can add a card or wallet later.",
  },
  {
    icon: <MapPin size={20} />,
    label: "Addresses",
    content: "Saved address: Colombo, Sri Lanka.\nHome and work addresses can be added here.",
  },
  {
    icon: <Bell size={20} />,
    label: "Notifications",
    content: "Notifications are enabled for price alerts, saved deals, and order updates.",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    content: "Manage app preferences, language, privacy, and appearance settings.",
  },
  {
    icon: <HelpCircle size={20} />,
    label: "Help & Support",
    content: "Need help? Contact Fetch support for account, payment, or comparison issues.",
  },
  {
    icon: <Info size={20} />,
    label: "About Fetch",
    content:
      "Fetch helps users compare prices between PickMe, Uber, food delivery, rides, and grocery services. It helps you find the best deal, save money, and choose faster options.",
  },
];

export default function ProfilePage() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5F7F5] text-black pb-28">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-500 px-6 pt-10 pb-8 rounded-b-[42px] text-white">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-white/25 border-2 border-white/60 flex items-center justify-center text-4xl flex-shrink-0">
            👩
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-black">Janira</h1>
            <p className="text-sm font-semibold opacity-90 mt-1">
              janira@example.com
            </p>
            <p className="text-sm font-semibold opacity-90">+94 71 234 5678</p>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="bg-white/20 p-3 rounded-2xl flex-shrink-0"
          >
            <Pencil size={18} />
          </button>
        </div>

        {editing && (
          <div className="mt-5 bg-white/20 rounded-3xl p-4">
            <p className="font-black mb-3">Edit Profile</p>

            <div className="space-y-3">
              <input
                placeholder="Janira"
                className="w-full bg-white text-black rounded-2xl px-4 py-3 outline-none font-semibold"
              />
              <input
                placeholder="janira@example.com"
                className="w-full bg-white text-black rounded-2xl px-4 py-3 outline-none font-semibold"
              />
              <input
                placeholder="+94 71 234 5678"
                className="w-full bg-white text-black rounded-2xl px-4 py-3 outline-none font-semibold"
              />

              <button
                onClick={() => setEditing(false)}
                className="w-full bg-black text-white rounded-2xl py-3 font-black"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Menu */}
      <section className="px-6 mt-6 space-y-3">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() =>
                setOpenItem(openItem === item.label ? null : item.label)
              }
              className="w-full bg-white rounded-3xl p-5 shadow-md flex items-center gap-4"
            >
              <div className="text-green-600">{item.icon}</div>

              <span className="flex-1 text-left font-black">{item.label}</span>

              {openItem === item.label ? (
                <ChevronDown size={18} className="text-gray-400" />
              ) : (
                <ChevronRight size={18} className="text-gray-400" />
              )}
            </button>

            {openItem === item.label && (
              <div className="bg-green-50 border border-green-200 rounded-3xl p-5 shadow-sm mt-2">
                <h3 className="font-black text-green-700 mb-2">
                  {item.label}
                </h3>

                <p className="text-sm text-gray-700 font-semibold leading-6 whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Log Out */}
        <Link href="/">
          <button className="w-full bg-red-500 hover:bg-red-600 rounded-3xl p-5 shadow-md flex items-center justify-center gap-3 mt-2">
            <LogOut size={20} className="text-white" />
            <span className="font-black text-white">Log Out</span>
          </button>
        </Link>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-5 left-5 right-5 bg-white rounded-3xl shadow-2xl px-6 py-4 flex justify-around border border-gray-100">
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