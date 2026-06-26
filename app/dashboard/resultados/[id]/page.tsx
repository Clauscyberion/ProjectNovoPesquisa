"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";

interface Response {
  answer: string;
}

interface Question {
  id: number;
  text: string;
  responses: Response[];
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export default function ResultadosPage() {
  const params = useParams();

  const id = params.id as string;

  const [survey, setSurvey] =
    useState<Survey | null>(null);

  const [loading, setLoading] =
    useState(true);

 useEffect(() => {
  if (id) {
    loadResults();
  }
}, [id]);

  async function loadResults() {
  try {
    console.log("ID recebido:", id);

    const response = await api.get(
      `/surveys/${id}/results`
    );

    console.log("RESULTADO:", response.data);

    setSurvey(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  function countAnswers(
    responses: Response[],
    option: string
  ) {
    return responses.filter(
      (response) => response.answer === option
    ).length;
  }

  if (loading) {
    return (
      <div className="p-10">
        Carregando resultados...
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-10">
        Pesquisa não encontrada
      </div>
    );
  }

  const totalResponses =
    survey.questions.length > 0
      ? survey.questions[0].responses.length
      : 0;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho */}

        <div className="bg-white rounded-2xl shadow p-8 mb-8">

          <h1 className="text-4xl font-bold">
            {survey.title}
          </h1>

          <p className="text-gray-600 mt-2">
            {survey.description}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-gray-500">
                Perguntas
              </p>

              <h2 className="text-3xl font-bold">
                {survey.questions.length}
              </h2>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500">
                Respostas
              </p>

              <h2 className="text-3xl font-bold">
                {totalResponses}
              </h2>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-gray-500">
                Pesquisa ID
              </p>

              <h2 className="text-3xl font-bold">
                #{survey.id}
              </h2>
            </div>

          </div>

        </div>

        {/* Perguntas */}

        <div className="space-y-6">

          {survey.questions.map((question) => {

            const excelente =
              countAnswers(
                question.responses,
                "Excelente"
              );

            const bom =
              countAnswers(
                question.responses,
                "Bom"
              );

            const regular =
              countAnswers(
                question.responses,
                "Regular"
              );

            const ruim =
              countAnswers(
                question.responses,
                "Ruim"
              );

            const pessimo =
              countAnswers(
                question.responses,
                "Péssimo"
              );

            return (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-bold mb-6">
                  {question.text}
                </h2>

                <div className="grid md:grid-cols-5 gap-4">

                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p>Excelente</p>

                    <h3 className="text-3xl font-bold">
                      {excelente}
                    </h3>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <p>Bom</p>

                    <h3 className="text-3xl font-bold">
                      {bom}
                    </h3>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <p>Regular</p>

                    <h3 className="text-3xl font-bold">
                      {regular}
                    </h3>
                  </div>

                  <div className="bg-orange-100 p-4 rounded-lg text-center">
                    <p>Ruim</p>

                    <h3 className="text-3xl font-bold">
                      {ruim}
                    </h3>
                  </div>

                  <div className="bg-red-100 p-4 rounded-lg text-center">
                    <p>Péssimo</p>

                    <h3 className="text-3xl font-bold">
                      {pessimo}
                    </h3>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}