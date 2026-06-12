"use client";

import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

interface Card {
  id: string;
  card_name: string;
  limit_total: number;
  available_limit: number;
  closing_day: number;
  due_day: number;
}

interface Props {
  cards: Card[];
}

export default function CardsList({ cards }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const confirmar = confirm("Deseja excluir este cartão?");

    if (!confirmar) return;

    const { error } = await supabase
      .from("cards")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao excluir.");
      return;
    }

    alert("Cartão excluído com sucesso!");
    router.refresh();
  }

  async function handleEdit(id: string, currentLimit: number) {
    const novoLimite = prompt(
      "Digite o novo limite total:",
      currentLimit.toString()
    );

    if (!novoLimite) return;

    const { error } = await supabase
      .from("cards")
      .update({
        limit_total: Number(novoLimite),
      })
      .eq("id", id);

    if (error) {
      alert("Erro ao atualizar.");
      return;
    }

    alert("Limite atualizado!");
    router.refresh();
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h3 className="text-xl font-bold mb-4">
            {card.card_name}
          </h3>

          <div className="space-y-2 mb-6">
            <p>
              Limite Total:
              <span className="text-green-400 font-bold ml-2">
                R$ {Number(card.limit_total).toLocaleString("pt-BR")}
              </span>
            </p>

            <p>
              Disponível:
              <span className="text-green-400 font-bold ml-2">
                R$ {Number(card.available_limit).toLocaleString("pt-BR")}
              </span>
            </p>

            <p>Fechamento: dia {card.closing_day}</p>

            <p>Vencimento: dia {card.due_day}</p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(card.id, card.limit_total)
              }
              className="bg-blue-600 px-4 py-2 rounded-xl font-bold"
            >
              ✏️ Editar
            </button>

            <button
              onClick={() => handleDelete(card.id)}
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