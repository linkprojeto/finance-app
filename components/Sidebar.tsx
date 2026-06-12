"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Landmark,
  CreditCard,
  TrendingUp,
  Receipt,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão do menu no celular */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 bg-zinc-900 p-2 rounded-xl md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Fundo escuro */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-zinc-950 border-r border-zinc-800 p-6
          z-50 transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:relative
        `}
      >
        <div className="flex justify-between items-center mb-10">

          <h2 className="text-2xl font-bold">
            Finance App 💰
          </h2>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>

        </div>

        <nav className="space-y-6">

          <Link href="/" className="flex items-center gap-3">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link href="/accounts" className="flex items-center gap-3">
            <Landmark size={20} />
            Contas
          </Link>

          <Link href="/cards" className="flex items-center gap-3">
            <CreditCard size={20} />
            Cartões
          </Link>

          <Link href="/investments" className="flex items-center gap-3">
            <TrendingUp size={20} />
            Investimentos
          </Link>

          <Link href="/daily-expenses" className="flex items-center gap-3">
            💸 Gastos Diários
          </Link>

          <Link href="/transactions" className="flex items-center gap-3">
            <Receipt size={20} />
            Receitas e Despesas
          </Link>

        </nav>

      </aside>
    </>
  );
}