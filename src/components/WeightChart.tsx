"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type WeightChartProps = {
  data: {
    date: string;
    weight: number;
  }[];
};

export function WeightChart({ data }: WeightChartProps) {
  return (
    <div className="h-80 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Weight Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}