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

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {investments.map((investment) => (

        <div
          key={investment.id}
          className="
          bg-zinc-900
          rounded-3xl
          p-6
          border border-zinc-800
          shadow-lg
          "
        >

          <h3 className="text-2xl font-bold mb-2">
            {investment.asset_name}
          </h3>

          <p className="text-zinc-400 mb-5">
            {investment.category}
          </p>

          <div className="space-y-4 mb-6">

            <div>

              <span className="text-zinc-400">
                Valor Investido
              </span>

              <br />

              <span className="text-green-400 text-3xl font-bold">
                R$ {Number(
                  investment.invested_amount
                ).toLocaleString("pt-BR")}
              </span>

            </div>

            <div>

              <span className="text-zinc-400">
                Renda Mensal
              </span>

              <br />

              <span className="text-green-400 text-xl font-bold">
                R$ {Number(
                  investment.monthly_income
                ).toLocaleString("pt-BR")}
              </span>

            </div>

            <p>
              🏦 {investment.broker}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(
                  investment.id,
                  investment.invested_amount
                )
              }
              className="
              flex-1
              bg-blue-600
              py-2
              rounded-xl
              text-sm
              font-bold
              "
            >
              ✏️ Editar
            </button>

            <button
              onClick={() =>
                handleDelete(investment.id)
              }
              className="
              flex-1
              bg-red-600
              py-2
              rounded-xl
              text-sm
              font-bold
              "
            >
              🗑 Excluir
            </button>

          </div>

        </div>

      ))}

    </div>

  );
}