"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
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
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        📊 Distribuição Patrimonial
      </h2>

      <div style={{ width: "100%", height: 300 }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}