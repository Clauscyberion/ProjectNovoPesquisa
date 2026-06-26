"use client";

import { useEffect, useState } from "react";
import { getSurveys } from "@/services/api";
import Link from "next/link";

export default function PesquisasPage() {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    async function loadSurveys() {
      try {
        const data = await getSurveys();
        setSurveys(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSurveys();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Pesquisas Disponíveis
        </h1>

        <div className="grid gap-4">
          {surveys.map((survey) => (
            <Link
              key={survey.id}
              href={`/pesquisas/${survey.id}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold">
                {survey.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {survey.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}