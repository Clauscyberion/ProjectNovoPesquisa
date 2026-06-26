"use client";

import { useState } from "react";
import  api from "@/services/api";

export default function NovaPesquisa() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [linkPesquisa, setLinkPesquisa] = useState("");


  function addQuestion() {
    setQuestions([...questions, ""]);
  }

  function updateQuestion(index: number, value: string) {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  }

  function removeQuestion(index: number) {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const response = await api.post("/surveys", {
      title,
      description,
      questions: questions
        .filter((question) => question.trim() !== "")
        .map((question) => ({
          text: question,
        })),
    });

    const survey = response.data;

    setLinkPesquisa(
      `http://localhost:3001/pesquisas/${survey.id}`
    );

    alert("Pesquisa criada com sucesso!");

    // Limpa o formulário
    setTitle("");
    setDescription("");
    setQuestions([""]);
  } catch (error) {
    console.error(error);
    alert("Erro ao criar pesquisa.");
  }
}

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">
          Nova Pesquisa
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block font-medium mb-2">
              Título
            </label>

            <input
              type="text"
              placeholder="Ex: Avaliação do Campus 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Descrição
            </label>

            <textarea
              placeholder="Descreva a pesquisa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows={4}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Perguntas
            </h2>

            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder={`Pergunta ${index + 1}`}
                    value={question}
                    onChange={(e) =>
                      updateQuestion(index, e.target.value)
                    }
                    className="flex-1 border rounded-lg p-3"
                  />

                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="px-4 bg-red-500 text-white rounded-lg"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Adicionar Pergunta
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
                >
              Salvar Pesquisa
            </button>
          </div>
          
          {linkPesquisa && (
            <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <p className="font-semibold">
              Link da pesquisa:
            </p>

            <a
              href={linkPesquisa}
              target="_blank"
              className="text-blue-600 underline"
            >
              {linkPesquisa}
            </a>
            </div>
            )}

        </form>
      </div>
    </div>
  );
}