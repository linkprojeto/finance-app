"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function InvestmentsPage() {

  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [broker, setBroker] = useState("");

  async function handleSave() {

    const { error } = await supabase
      .from("investments")
      .insert([
        {
          asset_name: assetName,
          category,
          invested_amount: Number(investedAmount),
          monthly_income: Number(monthlyIncome),
          broker,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Investimento cadastrado!");

    setAssetName("");
    setCategory("");
    setInvestedAmount("");
    setMonthlyIncome("");
    setBroker("");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <Link
        href="/"
        className="inline-block mb-8 text-green-400 hover:text-green-300"
      >
        ← Voltar
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Investimentos 📈
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-xl">

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Ativo"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Valor Investido"
          value={investedAmount}
          onChange={(e) => setInvestedAmount(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Rendimento Mensal"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-6"
          placeholder="Corretora"
          value={broker}
          onChange={(e) => setBroker(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          Salvar Investimento
        </button>

      </div>

    </main>
  );
}