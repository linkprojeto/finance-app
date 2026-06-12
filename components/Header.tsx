export default function Header() {

  const today = new Date().toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <div className="mb-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-zinc-400 text-lg mb-2">
            Bom dia 👋
          </p>

          <h1 className="text-3xl md:text-5xl font-bold">
            Dashboard Financeiro
          </h1>

          <p className="text-zinc-500 mt-3">
            Acompanhe seu patrimônio em tempo real.
          </p>

        </div>

        <div className="mt-6 md:mt-0">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3">

            <p className="text-zinc-400 text-sm">
              Hoje
            </p>

            <p className="font-bold">
              {today}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}