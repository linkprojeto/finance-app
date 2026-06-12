"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function CardsPage() {
  const [cardName, setCardName] = useState("");
  const [limitTotal, setLimitTotal] = useState("");
  const [availableLimit, setAvailableLimit] = useState("");
  const [closingDay, setClosingDay] = useState("");
  const [dueDay, setDueDay] = useState("");

  async function handleSave() {
    const { error } = await supabase
      .from("cards")
      .insert([
        {
          card_name: cardName,
          limit_total: Number(limitTotal),
          available_limit: Number(availableLimit),
          closing_day: Number(closingDay),
          due_day: Number(dueDay),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Cartão cadastrado com sucesso!");

    setCardName("");
    setLimitTotal("");
    setAvailableLimit("");
    setClosingDay("");
    setDueDay("");
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
        Cartões de Crédito 💳
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-xl">

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Nome do Cartão"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Limite Total"
          value={limitTotal}
          onChange={(e) => setLimitTotal(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Limite Disponível"
          value={availableLimit}
          onChange={(e) => setAvailableLimit(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          placeholder="Dia do Fechamento"
          value={closingDay}
          onChange={(e) => setClosingDay(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-lg mb-6"
          placeholder="Dia do Vencimento"
          value={dueDay}
          onChange={(e) => setDueDay(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          Salvar Cartão
        </button>

      </div>

    </main>
  );
}