"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function DailyExpensesPage() {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  async function handleSave() {

    const { error } = await supabase
      .from("daily_expenses")
      .insert([
        {
          description,
          amount: Number(amount),
          expense_date: expenseDate,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Gasto salvo!");

    setDescription("");
    setAmount("");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <Link
        href="/"
        className="inline-block mb-8 text-green-400"
      >
        ← Voltar ao Dashboard
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Gastos Diários 💸
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-xl">

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="w-full bg-zinc-800 p-3 rounded-lg mb-6"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          Salvar Gasto
        </button>

      </div>

    </main>
  );
}