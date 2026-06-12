"use client";

import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  category: string;
}

interface Props {
  transactions: Transaction[];
}

export default function TransactionsList({
  transactions,
}: Props) {

  const router = useRouter();

  async function handleDelete(id: string) {

    const confirmar = confirm(
      "Deseja excluir esta movimentação?"
    );

    if (!confirmar) return;

    await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    router.refresh();
  }

  async function handleEdit(
    id: string,
    currentValue: number
  ) {

    const novoValor = prompt(
      "Novo valor:",
      currentValue.toString()
    );

    if (!novoValor) return;

    await supabase
      .from("transactions")
      .update({
        amount: Number(novoValor),
      })
      .eq("id", id);

    router.refresh();
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {transactions.map((transaction) => (

        <div
          key={transaction.id}
          className="
          bg-zinc-900
          rounded-3xl
          p-6
          border border-zinc-800
          shadow-lg
          "
        >

          <h3 className="text-2xl font-bold mb-2">
            {transaction.description}
          </h3>

          <p className="text-zinc-400 mb-5">
            {transaction.category}
          </p>

          <div className="mb-6">

            <span className="text-zinc-400">
              {transaction.type}
            </span>

            <br />

            <span
              className={`text-3xl font-bold ${
                transaction.type === "Receita"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              R$ {Number(
                transaction.amount
              ).toLocaleString("pt-BR")}
            </span>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(
                  transaction.id,
                  transaction.amount
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
                handleDelete(transaction.id)
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