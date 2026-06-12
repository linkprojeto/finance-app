"use client";

import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

interface Expense {
  id: string;
  description: string;
  amount: number;
  expense_date: string;
}

interface Props {
  expenses: Expense[];
}

export default function DailyExpensesList({
  expenses,
}: Props) {

  const router = useRouter();

  function formatDate(dateString: string) {

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const date = new Date(dateString);

    const todayFormatted =
      today.toISOString().split("T")[0];

    const yesterdayFormatted =
      yesterday.toISOString().split("T")[0];

    if (dateString === todayFormatted) {
      return "Hoje";
    }

    if (dateString === yesterdayFormatted) {
      return "Ontem";
    }

    return date.toLocaleDateString("pt-BR");
  }

  async function handleDelete(id: string) {

    const confirmar = confirm(
      "Deseja excluir este gasto?"
    );

    if (!confirmar) return;

    await supabase
      .from("daily_expenses")
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
      .from("daily_expenses")
      .update({
        amount: Number(novoValor),
      })
      .eq("id", id);

    router.refresh();
  }

  const groupedExpenses = expenses.reduce(
    (groups, expense) => {

      const date = expense.expense_date;

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(expense);

      return groups;
    },
    {} as Record<string, Expense[]>
  );

  return (
    <div className="space-y-8">

      {Object.entries(groupedExpenses).map(
        ([date, items]) => {

          const totalDay = items.reduce(
            (sum, item) => sum + Number(item.amount),
            0
          );

          return (

            <div
              key={date}
              className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
            >

              <h2 className="text-2xl font-bold mb-6">
                {formatDate(date)}
              </h2>

              <div className="space-y-5">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="border-b border-zinc-800 pb-4"
                  >

                    <div className="flex justify-between mb-3">

                      <span>
                        {item.description}
                      </span>

                      <span className="text-red-400">
                        R$ {Number(item.amount).toLocaleString("pt-BR")}
                      </span>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleEdit(
                            item.id,
                            item.amount
                          )
                        }
                        className="bg-blue-600 px-4 py-2 rounded-xl"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="bg-red-600 px-4 py-2 rounded-xl"
                      >
                        🗑️ Excluir
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              <hr className="my-6 border-zinc-700" />

              <p className="font-bold text-xl">
                Total do dia:

                <span className="text-red-400 ml-2">
                  R$ {totalDay.toLocaleString("pt-BR")}
                </span>
              </p>

            </div>

          );
        }
      )}

    </div>
  );
}