import Link from "next/link";

interface SurveyCardProps {
  survey: {
    id: number;
    title: string;
    description?: string;
  };
}

export default function SurveyCard({
  survey,
}: SurveyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold">
        {survey.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {survey.description}
      </p>

      <div className="flex gap-3 mt-4">

        <Link
          href={`/pesquisas/${survey.id}`}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Abrir Pesquisa
        </Link>

        <Link
          href={`/dashboard/resultados/${survey.id}`}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Ver Resultados
        </Link>

      </div>
    </div>
  );
}