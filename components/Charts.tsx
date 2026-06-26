"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts({
  data,
}: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold text-xl mb-4">
        Respostas por Pesquisa
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="responses" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}