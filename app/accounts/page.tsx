"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function AccountsPage() {
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState("");

  async function handleSave() {
    if (!bankName || !balance) {
      alert("Preencha todos os campos.");
      return;
    }

    const { error } = await supabase
      .from("accounts")
      .insert([
        {
          bank_name: bankName,
          balance: Number(balance),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Conta cadastrada com sucesso!");

    setBankName("");
    setBalance("");
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
        Contas Bancárias 🏦
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-xl">

        <div className="mb-6">
          <label className="block mb-2">
            Nome do Banco
          </label>

          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            placeholder="Ex: Nubank"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Saldo
          </label>

          <input
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            placeholder="Ex: 1500"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          Salvar Conta
        </button>

      </div>

    </main>
  );
}