import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import AccountsList from "../components/AccountsList";
import CardsList from "../components/CardsList";
import InvestmentsList from "../components/InvestmentsList";
import TransactionsList from "../components/TransactionsList";
import PatrimonyChart from "../components/PatrimonyChart";
import DailyExpensesList from "../components/DailyExpensesList";
import Header from "../components/Header";

export default async function Home() {

  const { data: accounts } = await supabase
    .from("accounts")
    .select("*");

  const { data: cards } = await supabase
    .from("cards")
    .select("*");

  const { data: investments } = await supabase
    .from("investments")
    .select("*");

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*");

    const { data: dailyExpenses } = await supabase
  .from("daily_expenses")
  .select("*")
  .order("expense_date", { ascending: false });

  const totalAccounts =
    accounts?.reduce(
      (sum, account) => sum + Number(account.balance),
      0
    ) || 0;

  const totalCards =
    cards?.reduce(
      (sum, card) => sum + Number(card.limit_total),
      0
    ) || 0;

  const totalInvestments =
    investments?.reduce(
      (sum, investment) =>
        sum + Number(investment.invested_amount),
      0
    ) || 0;

  const passiveIncome =
    investments?.reduce(
      (sum, investment) =>
        sum + Number(investment.monthly_income),
      0
    ) || 0;

  const totalRevenue =
    transactions
      ?.filter((t) => t.type === "Receita")
      .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

  const totalExpenses =
    transactions
      ?.filter((t) => t.type === "Despesa")
      .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

  const monthlyBalance = totalRevenue - totalExpenses;

  return (
    <div className="md:flex min-h-screen bg-black text-white">

<Sidebar />

<main className="flex-1 p-4 pt-20 md:pt-10 md:p-10">

        <Header />

        {/* Cards Superiores */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-green-600 rounded-2xl p-6">
            <h2>Patrimônio em Contas</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {totalAccounts.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6">
            <h2>Total Investido</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {totalInvestments.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-purple-600 rounded-2xl p-6">
            <h2>Limite dos Cartões</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {totalCards.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-orange-600 rounded-2xl p-6">
            <h2>Renda Passiva Mensal</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {passiveIncome.toLocaleString("pt-BR")}
            </p>
          </div>

        </div>

        {/* Receitas e Despesas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-green-800 rounded-2xl p-6">
            <h2>Receitas do Mês</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {totalRevenue.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-red-800 rounded-2xl p-6">
            <h2>Despesas do Mês</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {totalExpenses.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-cyan-700 rounded-2xl p-6">
            <h2>Saldo do Mês</h2>
            <p className="text-3xl font-bold mt-2">
              R$ {monthlyBalance.toLocaleString("pt-BR")}
            </p>
          </div>

        </div>

        {/* Gráfico */}
        <div className="mb-12">
          <PatrimonyChart
            accounts={totalAccounts}
            investments={totalInvestments}
          />
        </div>

        {/* Contas */}
        <h2 className="text-3xl font-bold mb-6">
          🏦 Contas Bancárias
        </h2>

        <AccountsList accounts={accounts || []} />

        <div className="h-12"></div>

        {/* Cartões */}
        <h2 className="text-3xl font-bold mb-6">
          💳 Cartões de Crédito
        </h2>

        <CardsList cards={cards || []} />

        <div className="h-12"></div>

        {/* Investimentos */}
        <h2 className="text-3xl font-bold mb-6">
          📈 Investimentos
        </h2>

        <InvestmentsList investments={investments || []} />

        <div className="h-12"></div>

        {/* Movimentações */}
        <h2 className="text-3xl font-bold mb-6">
          💸 Receitas e Despesas
        </h2>

        <TransactionsList transactions={transactions || []} />
<div className="h-12"></div>

<h2 className="text-3xl font-bold mb-6">
  🗓️ Gastos Diários
</h2>

<DailyExpensesList expenses={dailyExpenses || []} />
      </main>

    </div>
  );
}