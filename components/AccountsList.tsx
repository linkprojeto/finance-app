"use client";

import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

interface Account {
  id: string;
  bank_name: string;
  balance: number;
}

interface Props {
  accounts: Account[];
}

export default function AccountsList({ accounts }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const confirmar = confirm("Deseja excluir esta conta?");

    if (!confirmar) return;

    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao excluir.");
      console.log(error);
      return;
    }

    alert("Conta excluída com sucesso!");
    router.refresh();
  }

  async function handleEdit(id: string, currentBalance: number) {
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
      alert("Erro ao atualizar.");
      console.log(error);
      return;
    }

    alert("Saldo atualizado com sucesso!");
    router.refresh();
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-green-500 transition"
        >
          <h3 className="text-xl font-semibold mb-4">
            {account.bank_name}
          </h3>

          <p className="text-3xl text-green-400 font-bold mb-6">
            R$ {Number(account.balance).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(account.id, account.balance)
              }
              className="bg-blue-600 px-4 py-2 rounded-xl font-bold"
            >
              ✏️ Editar
            </button>

            <button
              onClick={() => handleDelete(account.id)}
              className="bg-red-600 px-4 py-2 rounded-xl font-bold"
            >
              🗑️ Excluir
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}