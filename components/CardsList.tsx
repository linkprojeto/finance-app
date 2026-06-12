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

    const confirmar = confirm(
      "Deseja excluir este cartão?"
    );

    if (!confirmar) return;

    await supabase
      .from("cards")
      .delete()
      .eq("id", id);

    router.refresh();
  }

  async function handleEdit(
    id: string,
    currentLimit: number
  ) {

    const novoLimite = prompt(
      "Digite o novo limite total:",
      currentLimit.toString()
    );

    if (!novoLimite) return;

    await supabase
      .from("cards")
      .update({
        limit_total: Number(novoLimite),
      })
      .eq("id", id);

    router.refresh();
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((card) => (

        <div
          key={card.id}
          className="
          bg-zinc-900
          rounded-3xl
          p-6
          border border-zinc-800
          shadow-lg
          "
        >

          <h3 className="text-2xl font-bold mb-5">
            {card.card_name}
          </h3>

          <div className="space-y-3 mb-6">

            <p>
              <span className="text-zinc-400">
                Limite Total
              </span>

              <br />

              <span className="text-green-400 text-2xl font-bold">
                R$ {Number(card.limit_total).toLocaleString(
                  "pt-BR"
                )}
              </span>
            </p>

            <p>
              <span className="text-zinc-400">
                Disponível
              </span>

              <br />

              <span className="text-green-400 text-xl font-bold">
                R$ {Number(card.available_limit).toLocaleString(
                  "pt-BR"
                )}
              </span>
            </p>

            <p>
              📅 Fecha dia {card.closing_day}
            </p>

            <p>
              💳 Vence dia {card.due_day}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleEdit(
                  card.id,
                  card.limit_total
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
                handleDelete(card.id)
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