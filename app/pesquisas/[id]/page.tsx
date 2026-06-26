"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import  api  from "@/services/api";

interface Question {
  id: number;
  text: string;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export default function PesquisaPage(){
  //params,
//}: {
 // params: { id: string };
//}) {
 // const [survey, setSurvey] =
   // useState<Survey | null>(null);

  //const [answers, setAnswers] = useState<
   // Record<number, string>
 // >({});

//

 const params = useParams();

  const id = params.id as string;

  const [survey, setSurvey] =
    useState<Survey | null>(null);

    const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  //const [loading, setLoading] =
    //useState(true);

  useEffect(() => {
  if (id) {
    loadSurvey();
  }
}, [id]);

 // useEffect(() => {
   // loadSurvey();
  //}, []);

  async function loadSurvey() {
    try {
      const response = await api.get(
        `/surveys/${params.id}`
      );

      setSurvey(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function updateAnswer(
    questionId: number,
    value: string
  ) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  async function handleSubmit() {
  try {
    const formattedAnswers = Object.entries(
      answers
    ).map(([questionId, answer]) => ({
      questionId: Number(questionId),
      answer,
    }));

    await api.post("/responses", {
      answers: formattedAnswers,
    });

    alert("Obrigado por enviar suas respostas!");

    setAnswers({});
  } catch (error) {
    console.error(error);
    alert("Erro ao enviar respostas");
  }
}


if (!survey) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Carregando pesquisa...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold">
          {survey.title}
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          {survey.description}
        </p>

        <div className="space-y-8">

          {survey.questions.map((question) => (
            <div
              key={question.id}
              className="border-b pb-6"
            >
              <h2 className="font-semibold text-lg mb-4">
                {question.text}
              </h2>

              <div className="space-y-2">

                {[
                  "Péssimo",
                  "Ruim",
                  "Regular",
                  "Bom",
                  "Excelente",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex gap-2"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      onChange={(e) =>
                        updateAnswer(
                          question.id,
                          e.target.value
                        )
                      }
                    />

                    {option}
                  </label>
                ))}

              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Enviar Respostas
          </button>

        </div>

      </div>

    </div>
  );
}

