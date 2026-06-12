import Link from "next/link";
import {
  LayoutDashboard,
  Landmark,
  CreditCard,
  TrendingUp,
  Receipt
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">

      <h2 className="text-2xl font-bold mb-10">
        Finance App 💰
      </h2>

      <nav className="space-y-6">

        <Link href="/" className="flex items-center gap-3">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/accounts" className="flex items-center gap-3">
          <Landmark size={20} />
          Contas
        </Link>

        <Link href="/cards" className="flex items-center gap-3">
          <CreditCard size={20} />
          Cartões
        </Link>

        <Link href="/investments" className="flex items-center gap-3">
          <TrendingUp size={20} />
          Investimentos
        </Link>
<Link
  href="/daily-expenses"
  className="flex items-center gap-3"
>
  💸 Gastos Diários
</Link>
        <Link href="/transactions" className="flex items-center gap-3">
          <Receipt size={20} />
          Receitas e Despesas
        </Link>

      </nav>

    </aside>
  );
}