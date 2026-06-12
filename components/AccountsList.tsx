"use client";

import { supabase } from "../lib/supabase";

interface Account {
  id: string;
  bank_name: string;
  balance: number;
}

interface Props {
  accounts: Account[];
}

export default function AccountsList({ accounts }: Props) {

  async function handleDelete(id: string) {

    const confirmar = confirm(
      "Deseja excluir esta conta?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    window.location.reload();
  }

  async function handleEdit(
    id: string,
    currentBalance: number
  ) {

    const novoValor = prompt(
      "Digite o novo saldo:",
      currentBalance.toString()
    );

    if (!novoValor) return;

    const { error } = await supabase
      .from("accounts")
      .update({
        balance: Number(novoValor),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    window.location.reload();
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {accounts.map((account) => (

        <div
          key={account.id}
          className="
          bg-zinc-900
          rounded-3xl
          p-6
          border border-zinc-800
          shadow-lg
          "
        >

          <h3 className="text-2xl font-bold mb-4">
            {account.bank_name}
          </h3>

          <p className="text-4xl text-green-400 font-bold mb-6">
            R$ {Number(account.balance).toLocaleString(
              "pt-BR",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(
                  account.id,
                  account.balance
                )
              }
              className="flex-1 bg-blue-600 py-2 rounded-xl text-sm font-bold"
            >
              ✏️ Editar
            </button>

            <button
              onClick={() =>
                handleDelete(account.id)
              }
              className="flex-1 bg-red-600 py-2 rounded-xl text-sm font-bold"
            >
              🗑 Excluir
            </button>

          </div>

        </div>

      ))}

    </div>

  );
}