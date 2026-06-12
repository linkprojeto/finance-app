"use client";

import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

interface Investment {
  id: string;
  asset_name: string;
  category: string;
  invested_amount: number;
  monthly_income: number;
  broker: string;
}

interface Props {
  investments: Investment[];
}

export default function InvestmentsList({ investments }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const confirmar = confirm(
      "Deseja excluir este investimento?"
    );

    if (!confirmar) return;

    await supabase
      .from("investments")
      .delete()
      .eq("id", id);

    router.refresh();
  }

  async function handleEdit(
    id: string,
    currentValue: number
  ) {
    const novoValor = prompt(
      "Novo valor investido:",
      currentValue.toString()
    );

    if (!novoValor) return;

    await supabase
      .from("investments")
      .update({
        invested_amount: Number(novoValor),
      })
      .eq("id", id);

    router.refresh();
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {investments.map((investment) => (

        <div
          key={investment.id}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >

          <h3 className="text-xl font-bold mb-2">
            {investment.asset_name}
          </h3>

          <p className="text-zinc-400 mb-4">
            {investment.category}
          </p>

          <p className="text-green-400 text-2xl font-bold mb-2">
            R$ {Number(
              investment.invested_amount
            ).toLocaleString("pt-BR")}
          </p>

          <p className="mb-1">
            Renda Mensal: R${" "}
            {Number(
              investment.monthly_income
            ).toLocaleString("pt-BR")}
          </p>

          <p className="mb-6">
            Corretora: {investment.broker}
          </p>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(
                  investment.id,
                  investment.invested_amount
                )
              }
              className="bg-blue-600 px-4 py-2 rounded-xl"
            >
              ✏️ Editar
            </button>

            <button
              onClick={() =>
                handleDelete(investment.id)
              }
              className="bg-red-600 px-4 py-2 rounded-xl"
            >
              🗑️ Excluir
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}