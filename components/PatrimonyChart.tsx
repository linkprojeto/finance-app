"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  accounts: number;
  investments: number;
}

export default function PatrimonyChart({
  accounts,
  investments,
}: Props) {

  const data = [
    {
      name: "Contas",
      value: accounts,
    },
    {
      name: "Investimentos",
      value: investments,
    },
  ];

  const COLORS = ["#22c55e", "#3b82f6"];

  return (

    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        📊 Distribuição Patrimonial
      </h2>

      <div className="w-full h-[250px] md:h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}