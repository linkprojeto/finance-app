"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function TransactionsPage() {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Despesa");
  const [category, setCategory] = useState("");

  async function handleSave() {

    const { error } = await supabase
      .from("transactions")
      .insert([
        {
          description,
          amount: Number(amount),
          type,
          category,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Movimentação cadastrada!");

    setDescription("");
    setAmount("");
    setCategory("");
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
        Receitas e Despesas 💸
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

        <select
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Despesa</option>
          <option>Receita</option>
        </select>

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-6"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          Salvar
        </button>

      </div>

    </main>
  );
}