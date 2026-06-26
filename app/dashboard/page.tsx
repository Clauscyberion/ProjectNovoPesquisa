"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";
import SurveyCard from "@/components/SurveyCard";

export default function Dashboard() {
  const [surveys, setSurveys] = useState([]);

  const [totalPesquisas, setTotalPesquisas] =
    useState(0);

  const [totalRespostas, setTotalRespostas] =
    useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const surveysResponse =
        await api.get("/surveys");

      const responsesResponse =
        await api.get("/responses");

      setSurveys(surveysResponse.data);

      setTotalPesquisas(
        surveysResponse.data.length
      );

      setTotalRespostas(
        responsesResponse.data.length
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between mb-8">

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <Link
            href="/dashboard/nova-pesquisa"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Nova Pesquisa
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2>Total Pesquisas</h2>

            <p className="text-4xl font-bold mt-4">
              {totalPesquisas}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2>Total Respostas</h2>

            <p className="text-4xl font-bold mt-4">
              {totalRespostas}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2>Participação</h2>

            <p className="text-4xl font-bold mt-4">
              {totalPesquisas > 0
                ? Math.round(
                    (totalRespostas /
                      (totalPesquisas * 10)) *
                      100
                  )
                : 0}
              %
            </p>
          </div>

        </div>

        <h2 className="text-2xl font-bold mb-4">
          Pesquisas
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {surveys.map((survey: any) => (
            <SurveyCard
              key={survey.id}
              survey={survey}
            />
          ))}

        </div>

      </div>

    </div>
  );
}